//Copyright WyattERP.org: See LICENSE in the root of this package
//Rectangular, polar 2D vector conversions
//Copyright WyattERP.org: See LICENSE in the root of this package
// -----------------------------------------------------------------------------

module.exports = {
  rtop: function(rec) {
    if (!('x' in rec)) rec.x = 0
    if (!('y' in rec)) rec.y = 0
    let a = Math.atan2(rec.y, rec.x)
      , r = Math.sqrt(Math.pow(rec.x,2) + Math.pow(rec.y,2))
    return({a,r})
  },
  
  ptor: function(pol) {
    if (!('r' in pol)) pol.r = 0
    if (!('a' in pol)) pol.a = 0
    let x = pol.r * Math.cos(pol.a)
      , y = pol.r * Math.sin(pol.a)
    return({x,y})
  },

  add: function(v0, ...args) {
    let v1 = Object.assign({}, v0)
    if (!('x' in v1 || 'y' in v1)) v1 = this.ptor(v1)	//convert to rectangular?
    args.forEach(v2=>{
      if (v2) {
        if (!('x' in v2 || 'y' in v2)) v2 = this.ptor(v2)
        v1.x += v2.x
        v1.y += v2.y
      }
    })
    return (v1)
  },

  sub: function(v0, ...args) {
    let v1 = Object.assign({}, v0)
    if (!('x' in v1 || 'y' in v1)) v1 = this.ptor(v1)	//Convert to rectangular?
    args.forEach(v2=>{
      if (v2) {
        if (!('x' in v2 || 'y' in v2)) v2 = this.ptor(v2)
        v1.x -= v2.x
        v1.y -= v2.y
      }
    })
    return (v1)
  }
}
