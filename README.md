
# ListDragDrop

This component provide a feature of drag and drop options to re-order. Which can easily manage using callback function.

## Demo

[Try it!](https://jitendra-pathak.github.io/react-drag-drop-demo/)


## Browser Support

- Internet Explorer  10+
- Edge 12+
- Chrome 4+
- Firefox 2+
- Opera 12+
- Safari 5+

## Size 

Size is less than 7KB

## Getting Started

### Import Component

```js
import ListDragDrop from 'listdragdrop';
```


### Sample Data

```js
  const dragListData = [
    {
      id: 'row-1',
      value: 'Hello'
    },
    {
      id: 'row-2',
      value: 'Welcome',
      draggable: false,
    }
  ];
```

> NOTE: `draggable: true(default)/false` key can be used for enable/disable the option from drag and drop.


### Component Integration

```js
   <ListDragDrop
    containerId='colDrag'
    containerClass='colDragCustomClass'
    options={dragListData}
    customTemplate={getDragRowAction}
    onDragStartCallback={}
    onDragOverCallback={}
    onDragEndCallback={}
  />
```

### Add Custom Template

```js
  const getDragRowAction = (data) => {
    return <p>Custom Template: {data.value}</p>
  };
```

## Options

| Name                | Type     | Description                                                         |
| ------------------- | ---------| ------------------------------------------------------------------- |
| `containerId`       | string   | `used as a drop area container id`                                  |
| `containerClass`    | string   | `customize style using this container class`                |
| `itemClass`         | string   | `customize style of <li> item`                              |
| `options`           | Array    | `this is data for list`                                             |
| `customTemplate`    | function | `serve your custom UI`                            |
| `onDragStartCallback` | function | `callback: called on start of drag, return selected option`       |
| `onDragOverCallback`  | function | `callback: called after drag start and, return hovered option`    |
| `onDragEndCallback`   | function | `callback: called after drop, return newly structure data`        |

## License

Please see [LICENSE.md](./LICENSE.md) for details.