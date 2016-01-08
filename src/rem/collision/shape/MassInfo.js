/**
 * Basic class to hold mass information of a shape.
 * @author saharan
 * @author lo-th
 */
OIMO.MassInfo = function(){
    this.mass = 0; // Mass of the shape
    this.inertia = new OIMO.Mat3; // The moment of inertia of the shape
};
