const fs = require('fs')
let database=[];
let src="";
let info={};
let filters={};
module.exports= {
  src: {
    set: (path) => {
      src= path
      database= JSON.parse(
        fs.readFileSync(src),
      )
    },
  },
  filters: {
    add: (name, value) => {
      if (!(name in filters)) {
        filters[name] = []
      }
      filters[name].push(value)
    },
    clear: () => {
      filters = {}
    },
    apply: () => {
      return database.filter((data) => {
        let keys = Object.keys(filters)
        for (let index = 0; index < keys.length; index++) {
          const key = keys[index]
          if (!filters[key].includes(data[key])) return false
        }
        return true
      })
    },
  },
  summary: (info=[]) => {
    let summary = {}
    info.forEach((data) => {
      let keys = Object.keys(data)
      for (let index = 0; index < keys.length; index++) {
        if (!(keys[index] in summary)) summary[keys[index]] = {}
        if (!(data[keys[index]] in summary[keys[index]]))
          summary[keys[index]][data[keys[index]]] = 0
        summary[keys[index]][data[keys[index]]]++
      }
    })
    return summary
  },
}
