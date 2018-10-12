//Dragger and mover functions in a module
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//TODO:
//- 
import interact from 'interactjs'

export default {
  moveHandler(event) {
//console.log("Moving: " + JSON.stringify(event.rect));
    let target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  },

  sizeHandler(event) {
//console.log("Sizing: " + JSON.stringify(event.rect));
    let target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);
    target.style.width = event.rect.width + 'px'
    target.style.height = event.rect.height + 'px'
    x += event.deltaRect.left;
    y += event.deltaRect.top;
    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  },

  setupDragMove(element, dragIgnore, dragAllow, sizeIgnore, sizeAllow) {
    let sizeConfig = {
      inertia: true,
      border: 2,
      edges: {top:true, left: true, right: true, bottom: true},		/* Can't do top: true without losing dragability! */
      restrictSize: {min: {width: 50, height: 50}},
      onmove: this.sizeHandler
    }
    let dragConfig = {
      inertia: true,
      onmove: this.moveHandler
    }
    if (sizeIgnore) Object.assign(sizeConfig, {ignoreFrom: sizeIgnore})
    if (sizeAllow)  Object.assign(sizeConfig, {allowFrom: sizeAllow})
    if (dragIgnore) Object.assign(dragConfig, {ignoreFrom: dragIgnore})
    if (dragAllow)  Object.assign(dragConfig, {allowFrom: dragAllow})
//console.log("setup sizeConfig: " + JSON.stringify(sizeConfig));
//console.log("setup dragConfig: " + JSON.stringify(dragConfig));

    interact(element).resizable(sizeConfig).draggable(dragConfig)
//Fix to allow drag from top of window?
//      .actionChecker(function (pointer, event, action, interactable, element, interaction) {
////console.log("checker: " + event.target);
//        if (interact.matchesSelector(event.target, dragAllow)) {
//          action.name = 'drag';			// force drag with handle target
//        } else {				// resize from the top and right edges
//          action.name  = 'resize';
//          action.edges = { top: true, left: true, right: true, bottom: true };
//        }
//        return action;
//      })
  }
}
