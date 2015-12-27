/**
 * A broad-phase algorithm with brute-force search.
 * This always checks for all possible pairs.
 * @author lo-th
 */
OIMO.BruteForceBroadPhase = function(){
    OIMO.BroadPhase.call(this);

    this.types = 0x1;
    this.numProxies = 0;
    this.maxProxies = 256;
    this.proxies = []; // vector
    this.proxies.length = 256;
};
OIMO.BruteForceBroadPhase.prototype = Object.create(OIMO.BroadPhase.prototype);
OIMO.BruteForceBroadPhase.prototype.constructor = OIMO.BruteForceBroadPhase;

OIMO.BruteForceBroadPhase.prototype.createProxy = function(shape){
    return new OIMO.BasicProxy(shape);
};
OIMO.BruteForceBroadPhase.prototype.addProxy = function(proxy){
    if(this.numProxies === this.maxProxies){
        this.maxProxies *= 2;
        var newProxies = [];
        newProxies.length = this.maxProxies;
        var i = this.numProxies;
        while(i--){
        //for(var i=0, l=this.numProxies;i<l;i++){
            newProxies[i]=this.proxies[i];
        }
        this.proxies=newProxies;
    }

    this.proxies[this.numProxies++] = proxy;
};
OIMO.BruteForceBroadPhase.prototype.removeProxy = function(proxy){
    var i = this.numProxies;
    while(i--){
        if(this.proxies[i] == proxy){
            this.proxies[i] = this.proxies[--this.numProxies];
            this.proxies[this.numProxies] = null;
            return;
        }
    }
};
OIMO.BruteForceBroadPhase.prototype.collectPairs = function(){
    var i, j, p1, b1, s1, p2, b2, s2;

    this.numPairChecks = this.numProxies * (this.numProxies - 1) >> 1;

    i = this.numProxies; // Amount of proxies to check
    while(i--){
        p1 = this.proxies[i]; // First proxy
        b1 = p1.aabb; // AABB of proxy 1
        s1 = p1.shape; // Shape of proxy 1
        j = this.numProxies; // Amount of proxies to check

        while(j--){
            if(j !== i){
                p2 = this.proxies[j]; // Second proxy
                b2 = p2.aabb; // AABB of proxy 2
                s2 = p2.shape; // Shape of proxy 2

                if(
                    b1.maxX < b2.minX ||
                    b1.minX > b2.maxX ||
                    b1.maxY < b2.minY ||
                    b1.minY > b2.maxY ||
                    b1.maxZ < b2.minZ ||
                    b1.minZ > b2.maxZ ||
                    !this.isAvailablePair(s1, s2)
                )
                    continue;

                this.addPair(s1, s2);
            }
        }
    }
};
