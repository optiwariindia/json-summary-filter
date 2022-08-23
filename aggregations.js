const fs = require('fs')
const panelService = {
  src: {
    value: '',
    set: (path) => {
      panelService.src.value = path
      panelService.database = JSON.parse(
        fs.readFileSync(panelService.src.value),
      )
    },
  },
  database: [],
  filters: {
    info: {},
    add: (name, value) => {
      if (!(name in panelService.filters.info)) {
        panelService.filters.info[name] = []
      }
      panelService.filters.info[name].push(value)
    },
    clear: () => {
      panelService.filters.info = {}
    },
    apply: () => {
      let filters = panelService.filters.info
      return panelService.database.filter((data) => {
        let keys = Object.keys(filters)
        for (let index = 0; index < keys.length; index++) {
          const key = keys[index]
          if (!filters[key].includes(data[key])) return false
        }
        return true
      })
    },
  },
  summary: () => {
    let info = panelService.filters.apply()
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
module.exports = panelService;