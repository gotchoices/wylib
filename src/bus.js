//Message bus
//Copyright WyattERP.org: GNU GPL Ver 3; see: License in root of this package
// -----------------------------------------------------------------------------
//- TODO:
//- Why is 'vm' an argument to messageBus?
//- 

module.exports = {
  messageBus(vm) {		//Bus for messages to be distributed to registered clients
    this.master = vm
    this.clients = {}
    
    this.register = function(id, cb) {	//Clients register to receive callbacks
//console.log("Bus register:", id, cb)
      if (cb) 
        this.clients[id] = cb
      else if (id in this.clients && !cb)
        delete this.clients[id]
    },
    
    this.notify = function(message, data) {	//Every registered client will get every message
      let replies = []
//console.log("Bus notify:", this.clients)
      Object.keys(this.clients).forEach(key => {
//console.log("Bus:", this.master, "notifying:", key)
        replies.push(this.clients[key](message, data))
      })
//console.log("Bus ans:", this.master, replies)
      return replies
    }
  },

  eventBus() {			//Like messageBus, but clients can listen for specific events
    this.events = {}
    this.register = function(id, event, cb) {		//I:ID am listening for events:event
      if (!(event in this.events)) this.events[event] = {}
//console.log("Register id:", id, "event:", event)
      if (cb) {						//Registering or re-registering
        this.events[event][id] = cb
      } else if (id in this.events[event]) {		//De-registering
        delete this.events[events][id]
      }
    }
    this.notify = function(event, data) {			//Invoke all listener callbacks for: event
      let replies = []
//console.log("Notify event:", event, this.events[event])
      if (this.events[event]) Object.keys(this.events[event]).forEach(id => {
        replies.push(this.events[event][id](data))
      })
      return replies
    }
  },
}
