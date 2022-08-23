# JSON-Summary-Filter
## Introduction
This package is created to provide support for following activities:
    1. Create summary of your JSON Files
    1. Apply Filters on your JSON Files

## Installation

``` npm install json-summary-filter ```

## How to use
### Set src file

```const jsonservice=require ("json-summary-filter")```
```jsonservice.src.set("./${path_to_json_file}")```

### Add Filter 
```jsonservice.filters.add(`${field_name}`,`${filter_value}`)```

Repeat above lines to apply multiple filters

### Clear filter
```jsonservice.filters.clear()```

### Create summary
``` let summary = jsonservice.summary(jsonservice.filters.apply())```

You can use this module to generate summary of your own JSON Arrays

``` let summary = jsonservice.summary(YourJSONArray)```

# For suggestions and support 

Please raise an issue on github if you require support or you have some suggestion about the package.