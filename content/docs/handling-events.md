---
id: handling-events
title: ایونٹ ہینڈلنگ کی ترتیب‎
permalink: docs/handling-events.html
prev: state-and-lifecycle.html
next: conditional-rendering.html
redirect_from:
  - "docs/events-ko-KR.html"
---

React اور DOM دونوں میں ایونٹ ہینڈلنگ کی ترتیب ایک دوسرے سے مشابہت رکھتی ہے حالانکہ، syntax میں کچھ چیزیں مختلف ہیں

* React میں ایونٹس کا نام camelCase میں لکھا جاتا ہے بجائے lowercase کے
* JSX میں آپ فنکشن پاس کریں گے بتور ایونٹ ہینڈلر بجائے ایک string کے

مثلاً یہ HTML

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

React میں کچھ اس طرح نظر آئے گا

```js{1}
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

ایونٹس کا پہلے سے طے شدہ ردہ عمل بدلنے کے لئے React میں `false` ریٹرن کرنا کافی نہیں، آپ کو `preventDefault` واضح طور پہ استعمال کرنا پڑے گا ۔ مثال کے طور پہ HTML میں ایک link کا طے شدہ ردہ عمل ایک نیا پیج گھولنا ہوتا ہے جس کو کچھ اس طرح سے تبدیل کیا جا سکتا ہے

```html
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

جب کہ React میں یہ کچھ یوں لکھا جا سکتا ہے

```js{2-5,8}
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

یہاں پہ `e` ایک synthethic ایونٹ ہے، ان synthetic ایونٹس کو React نے [W3C spec](https://www.w3.org/TR/DOM-Level-3-Events/) کو مدنظر رکھتے ہوئے بنایا ہے  لہٰذا یہ کراس-براوزر مطابقت رکھتے ہیں ۔ اس موضوع پہ اور معلومات حاصل کرنے کے لیے [`SyntheticEvent`](/docs/events.html) سے منسوب گائیڈ کو ملاحظہ فرمائیں

عموماً React میں DOM کے عناصر پر listeners جوڑنے کے لیے `addEventListener` استعمال کرنے کی ضرورت نہیں پڑتی، یہ کافی ہے کہ جب عناصر render ہو تب آپ listener فراہم کر دیں

جب آپ [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) کا استعمال کرتے ہوئے جزو بناتے ہیں تو ایک آم پیٹرن یہ ہے کہ ایونٹ ہینڈلر کو اس class کا طریقہ یا method بنا دیا جائے ۔ مثال کے طور پہ یہ `Toggle` جزو ایک بٹن render کر رہا ہے جس سے ایک یوزر آن اور آف states کے درمیان ٹوگل کر سکتا ہے

```js{6,7,10-14,18}
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
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

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

[**Codepen میں دیکھیں**](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)

JSX callbacks میں `this` کے معنی کا آپ کو خاص خیال رکھنا پڑے گا، JavaScript میں class methods پہلے سے [bound](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) نہیں ہوتے لہٰذا اگر آپ نے `this.handleClick` کو `onClick` میں بنا bind کیے پاس کر دیا تو `this` کا حاصل function کال کے وقت `undefined` ہو گا

یہ ترتیب React کی وجہ سے نہیں ہے، JavaScript میں [functions یوں ہی کام کرتے ہیں](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/) عموماً اگر آپ کسی method کو بنا `()` کے مخاطب کرتے ہیں مثلاً `onClick={this.handleClick}` تو اس کو bind کرنا ضروری ہے

اگر `bind` کا استعمال آپ کو پسند نہیں تو آپ دو اور طریقے اختیار کر سکتے ہیں ۔ اگر آپ تجرباتی [public class fields syntax](https://babeljs.io/docs/plugins/transform-class-properties/) سے واقف ہیں تو class fields کا استعمال کریں callbacks کو bind کرنے کے لیے

```js{2-6}
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

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

اس syntax کی خامی یہ ہے کہ `LoggingButton` کے ہر ایک render کے ساتھ یہ ایک نیا callback وجود میں لائے گا، عموماً اس عمل سے کچھ خاص فرق نہیں پڑتا حالانکہ اگر اس callback کو ایک prop کے طور پہ نچلے جزو میں pass کیا جاتا ہے تو وہ جزو ایک اضافی re-rendering کر سکتے ہیں ۔ ہماری رائے میں ان کارکردگی سے متعلق مسائل سے بچنے کے لئے آپ constructor میں binding کا استعمال کریں اور یا class fields syntax کا

## ایونٹ ہینڈلرس میں arguments فراہم کرنا {#passing-arguments-to-event-handlers}

لوپ کے اندر ایونٹ ہینڈلر میں ایک اضافی parameter فراہم کرنا ایک آم بات ہے، مثلاً اگر `id` کو رو ID سے نسبت دی جائے تو انمے سے کوئی بھی استعمال میں لایا جا سکتا ہے

```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

یہ دونوں ترتیبات برابر ہیں جو کہ [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) اور [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) کا استعمال کر رہی ہیں

ان میں `e` جو کہ ایک React ایونٹ ہے ID کے بعد دوسرے argument کی طرح پاس کیا جائے گا، arrow function کے ساتھ اسے واضح طور پر پاس کرنا پڑے گا جب کہ `bind` کے استعمال میں باقی arguments خود بخود آگے پاس کر دیئے جائیں گے
