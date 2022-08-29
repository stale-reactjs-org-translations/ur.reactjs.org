---
id: handling-events
title: Event Handling کی ترتیب
permalink: docs/handling-events.html
prev: state-and-lifecycle.html
next: conditional-rendering.html
redirect_from:
  - "docs/events-ko-KR.html"
---

React اور DOM دونوں میں event handling کی ترتیب ایک دوسرے سے مشابہت رکھتی ہے لیکن ان  دونوں کے لکھنے کا انداز مختلف ہے

* React events کو lowercase کے بجائے camelCase میں لکھا جاتا ہے
* JSX میں آپ event handler کو string کے بجائے function کے طور پر پیش کرتے ہیں

مثلاً یہ HTML

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

React میں یوں لکھا جائے گا

```js{1}
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

Another difference is that you cannot return `false` to prevent default behavior in React. You must call `preventDefault` explicitly. For example, with plain HTML, to prevent the default form behavior of submitting, you can write:

```html
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
```

وہیں React میں یہ یوں لکھا جا سکتا ہے

```js{3}
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

`e` یہاں پر ایک synthethic event ہے، ان synthetic events کو React نے [W3C spec](https://www.w3.org/TR/DOM-Level-3-Events/) کو مدنظر رکھتے ہوئے بنایا ہے لہٰذا یہ مختلف براوزروں کے درمیان مطابقت رکھتے ہیں ۔ اس موضوع پہ مزید معلومات حاصل کرنے کے لیے [`SyntheticEvent`](/docs/events.html) سے منسوب گائیڈ کو ملاحظہ فرمائیں

React میں عموماً DOM کے عناصر پر listeners جوڑنے کے لیے `addEventListener` استعمال نہیں کرنا پڑتا، یہ کافی ہے کہ جب عناصر render ہو تب آپ listener فراہم کر دیں

جب آپ [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) کا استعمال کرتے ہوئے جزو بناتے ہیں تو ایک عام طریقہ کار یہ ہے کہ event handler کو اس class کا طریقہ (method) بنا دیا جائے ۔ مثال کے طور پر یہ `Toggle` جزو ایک بٹن render کر رہا ہے جس سے ایک صارف "ON" اور "OFF" states کے درمیان ٹوگل کر سکتا ہے

```js{6,7,10-14,18}
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

[**Codepen میں دیکھیں**](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)

آپ کو JSX callbacks میں `this` کے معنی کا خاص خیال رکھنا پڑے گا، Javascript میں class کے طریقے (methods) پہلے سے [bound](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) نہیں ہوتے لہٰذا اگر آپ `this.handleClick` کو bind کرنا بھول کیے اور اسے `onClick` میں پاس کر دیا تو `this` کا حاصل function call کے وقت `undefined` ہو جائے گا

یہ طرزِ عمل React کی وجہ سے نہیں ہے، یے [JavaScript functions کا ایک بنیادی پہلو ہے](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/) ۔ عموماً اگر آپ کسی طریقے (method) کو بنا () کے مخاطب کرتے ہیں جیسے مثلاً `onClick={this.handleClick}`، تو آپ کو اسے bind کرنا چاہیے

<<<<<<< HEAD
اگر `bind` کا استعمال آپ کو دشوار لگتا ہے تو آپ دو طریقے اختیار کر سکتے ہیں ۔ اگر آپ تجرباتی [public class fields syntax](https://babeljs.io/docs/plugins/transform-class-properties/) کا استعمال کر رہے ہیں تو آپ class fields سے callbacks کو صحیح طریقہ سے bind کر سکتے ہیں
=======
If calling `bind` annoys you, there are two ways you can get around this. You can use [public class fields syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#public_instance_fields) to correctly bind callbacks:
>>>>>>> ea9e9ab2817c8b7eff5ff60e8fe9b649fd747606

```js{2-6}
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  handleClick = () => {
    console.log('this is:', this);
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

یہ syntax پہلے سے ہی [Create React App](https://github.com/facebookincubator/create-react-app) میں زیر استعمال ہے

اگر آپ class fields syntax کا استعمال نہیں کر رہے تو آپ callback میں [arrow function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) کا استعمال کر سکتے ہیں

```js{7-9}
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```

اس syntax کی خامی یہ ہے کہ `LoggingButton` کا ہر ایک render ایک نیا callback بھی بنائے گا، زیادہ تر معاملات میں، یہ ٹھیک ہے۔ حالانکہ اگر اس callback کو ایک prop کے طور پہ نچلے جزو میں پیش کیا جائے تو وہ جزو ایک اضافی re-rendering کر سکتے ہیں ۔ کارکردگی سے متعلق ان مسائل سے بچنے کے لیے ہم آپ کو دو مشورے دیں گے، پہلا constructor میں binding کا استعمال ہے اور دوسرا class fields syntax کا

## Event Handlers میں arguments فراہم کرنا {#passing-arguments-to-event-handlers}

Loop کے اندر event handler میں ایک اضافی parameter فراہم کرنا ایک عام عمل ہے، مثلاً اگر `id` کو  row ID سے نسبت دی جائے تو ان میں سے کوئی بھی طریقہ استعمال میں لایا جا سکتا ہے

```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

یہ دونوں ترتیبات برابر ہیں جو کہ [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) اور [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) کا استعمال کر رہی ہیں

یہاں `e` argument ایک React event ہے جو کی ID کے بعد دوسرے argument کی طرح پیش کیا جائے گا، ایک arrow function کے ساتھ ہم اسے واضح طور پر پیش کریں گے جب کہ `bind` کے استعمال میں باقی arguments خود بخود آگے پیش کر دیئے جائیں گے
