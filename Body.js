//Planet body
var Body = function (x, y, velx, vely, mass, radius) {
    this.position = new Gravity.Vector(x,y) ;
    this.velocity = new Gravity.Vector(velx,vely);
    this.acceleration = new Gravity.Vector(0,0);
    this.mass = mass;
    this.createImage(radius);
};

//creates a uniformly colored sphere
Body.prototype.createImage = function (radius) {
    var geometry = new THREE.SphereGeometry( radius, 20, 20 );
    var material = new THREE.MeshBasicMaterial( { color: 0x3399ff });
    this.image = new THREE.Mesh( new THREE.SphereGeometry( 75, 20, 20 ), material );
    /*Never modify a y-position of an image!!!*/
    this.image.position.set( this.x, 0, this.z );
    scene.add(this.image);
};

//wraps all methods that are run every step of the
//simulation
Body.prototype.run = function () {
    this.update();
    this.display();
};

//displays the body
Body.prototype.display = function () {
    console.log(this.position.x,this.position.y);
};

//gets called for every step of the animation,
//updates the properties of the body
Body.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};

//a = F / m
Body.prototype.applyForce = function (force) {
    force.div(this.mass);
    this.acceleration.add(force);
};

//gets distance to another body
Body.prototype.getDistanceTo (body2) {
    return this.position.dist(body2.position);
};

//calculates the attraction force to another body
Body.prototype.calculateAttraction = function(body2) {
    var force = Vector.sub(object.position,this.position);
    var distance = force.mag();
    force.normalize();
    var strength (G * this.mass * body2.mass) / (distance * distance);
    force.mult(strength);
    return force;
};
