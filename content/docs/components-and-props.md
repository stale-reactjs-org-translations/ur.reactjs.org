---
id: components-and-props
title: Props اجزاء اور 
permalink: docs/components-and-props.html
redirect_from:
  - "docs/reusable-components.html"
  - "docs/reusable-components-zh-CN.html"
  - "docs/transferring-props.html"
  - "docs/transferring-props-it-IT.html"
  - "docs/transferring-props-ja-JP.html"
  - "docs/transferring-props-ko-KR.html"
  - "docs/transferring-props-zh-CN.html"
  - "tips/props-in-getInitialState-as-anti-pattern.html"
  - "tips/communicate-between-components.html"
prev: rendering-elements.html
next: state-and-lifecycle.html
---

اجزاء آپ تقسیم دو UI آزاد، دوبارہ پریوست ٹکڑوں میں، اور تنہائی میں ہر ایک ٹکڑا کے بارے میں سوچتے ہیں. اس صفحہ اجزاء کے خیال کے لئے ایک تعارف فراہم کرتا ہے. آپ کو ایک حاصل کر سکتے ہیں [تفصیلی جزو API یہاں کا حوالہ](/docs/react-component.html).

تصوراتی، اجزاء کی طرح ہیں JavaScript افعال. وہ من مانی آدانوں کو قبول ("props" کہا جاتا ہے (اور واپس React عناصر بیان کی سکرین پر کیا ظاہر ہونا چاہیے.

##  Class  فنکشن اجزاء اور{#function-and-class-components}

ایک جزو کی وضاحت کرنے کا آسان ترین طریقہ ایک لکھنے کے لئے ہے JavaScript فنکشن:

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

یہ تقریب ایک درست جزو React یہ کسی ایک کو قبول کرتا ہے کیونکہ یہ ہے "props" (جس کی خصوصیات کے لئے کھڑا ہے) اعداد و شمار کے ساتھ اعتراض دلیل اور React عنصر. ہم اس طرح کے اجزاء "کی تقریب کے اجزاء" کہتے ہیں وہ لفظی ہیں کیونکہ JavaScript افعال.

آپ یہ بھی ایک استعمال کر سکتے ہیں [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) ایک جزو کی وضاحت کے لئے:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

مندرجہ بالا دو اجزاء سے برابر ہیں React's نقطہ نظر.

Classes کہ ہم میں بات چیت کریں گے کچھ اضافی خصوصیات ہیں [اگلے حصوں](/docs/state-and-lifecycle.html). اس وقت تک، ہم ان کی conciseness لئے تقریب اجزاء استعمال کریں گے.

## ایک جزو رینڈرینگ {#rendering-a-component}

ماضی میں، ہم صرف کا سامنا کرنا پڑا React کی نمائندگی کرتے ہیں کہ عناصر DOM ٹیگز:

```js
const element = <div />;
```

تاہم، عناصر بھی نمائندگی کر سکتے ہیں صارف کی وضاحت کے اجزاء:

```js
const element = <Welcome name="Sara" />;
```

کب React ایک صارف کی وضاحت کے اتحادیوں کی نمائندگی ایک عنصر ہے، یہ گزر جاتا ہے دیکھتا ہے JSX ایک بھی اعتراض کے طور پر اس کے اتحادیوں کو ٹھہراتے ہیں. ہم اس اعتراض کو فون "props".

مثال کے طور پر یہ کوڈ دیتا "Hello, Sara" صفحہ پر:

```js{1,5}
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[](codepen://components-and-props/rendering-a-component)

چلو recap ہے اس مثال میں کیا ہوتا ہے:

1. ہم پر کال کریں `ReactDOM.render()` کے ساتہ `<Welcome name="Sara" />` عنصر.
2. React بلاتا ہے `Welcome` ساتھ جزو `{name: 'Sara'}` کے طور پر props.
3. ہمارا `Welcome` جزو ریٹرن ایک `<h1>Hello, Sara</h1>` نتیجے کے طور پر عنصر.
4. React DOM مؤثر طریقے سے اپ ڈیٹ DOM ملانا `<h1>Hello, Sara</h1>`.

>**Note:** ہمیشہ ایک سرمایہ خط کے ساتھ جزو ناموں کرنا شروع کریں.
>
>React کے طور پر چھوٹے حروف سے شروع ہونے کا علاج کرتا ہے کے اجزاء DOM ٹیگز. مثال کے طور پر، `<div />` کی نمائندگی کرتا ہے ایک HTML div ٹیگ، لیکن `<Welcome />` ایک جزو کی نمائندگی کرتا ہے اور کی ضرورت ہوتی ہے `Welcome` دائرہ کار میں ہونا.
>
>اس کنونشن کے فلسفه کے بارے میں مزید جاننے کے لئے، براہ مہربانی پڑھیں [JSX گہرائی میں](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized).

## کمپوز اجزاء {#composing-components}

اجزاء کو ان کی پیداوار میں دوسرے اجزاء سے رجوع کر سکتے ہیں. یہ ہمیں تفصیل کے کسی بھی سطح کے لئے ایک ہی جزو تجرید کو استعمال کرنے دیتا ہے. ایک بٹن، ایک فارم، ایک ڈائیلاگ، ایک سکرین: میں React اطلاقات، ان تمام لوگوں کو عام طور پر اجزاء کے طور پر اظہار کر رہے ہیں.

مثلا، ہم ایک بنا سکتے ہیں `App` دیتا ہے کہ جزو `Welcome`بہت دفعہ:

```js{8-10}
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[](codepen://components-and-props/composing-components)

عام طور پر، نئے React ایپس سب سے اوپر پر ایک واحد `App` جزو ہے. تاہم، اگر آپ کو ایک موجودہ اے پی پی میں رد عمل کا اظہار ضم تو، آپ کو نیچے سے اوپر `طرح Button` ایک چھوٹا سا جزو کے ساتھ شروع کر سکتے ہیں اور آہستہ آہستہ نقطہ نظر تنظیمی ڈھانچے کے سب کو اپنے راستے کام کرتے ہیں.

## نکالنے اجزاء {#extracting-components}

چھوٹے اجزاء میں اجزاء کو تقسیم کرنے کے لئے خوف زدہ نہیں ہو.

مثال کے طور پر اس پر غور `Comment` اجزاء:

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[](codepen://components-and-props/extracting-components)

اس کو قبول کرتا ہے `author` (ایک چیز), `text` (ایک تار), `date` (ایک تاریخ)
جیسے props, اور کسی سوشل میڈیا ویب سائٹ پر ایک تبصرہ وضاحت.

یہ جزو کیونکہ تمام گھوںسلا کے تبدیل کرنے کے لئے مشکل ہو سکتا ہے، اور یہ اس کا انفرادی حصوں کو دوبارہ استعمال کرنے کے لئے بھی مشکل ہے. چلو اس سے چند اجزاء کو نکالنے دیں.

سب سے پہلے، ہم نکالیں گے `Avatar`:

```js{3-6}
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

ال `Avatar` جاننا یہ ایک اندر مہیا کی جا رہی ہے کہ ضرورت نہیں ہے `Comment`. ہم کیوں دیا ہے یہ ہے اس کی prop ایک سے زیادہ عام نام: `user` بجائے اس کے `author`.

ہم نام دینے کی سفارش کرتے ہیں props from the قول کے جزو کے اپنے نقطہ کی بجائے جس میں اس کا استعمال کیا جا رہا ہے تناظر.

اب ہم کو آسان بنانے کے کر سکتے ہیں `Comment` ایک چھوٹے سا:

```js{5}
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

اگلا، ہم نے ایک کو ہٹا دیں گے `UserInfo` ایک دیتا ہے کہ جزو `Avatar` صارف کے نام کے آگے:

```js{3-8}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

اس سے ہمیں اجازت دیتا ہے آسان `Comment` آگے مزید:

```js{4}
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[](codepen://components-and-props/extracting-components-continued)

اجزاء کو نکالنے سکتا ہے سب سے پہلے میں گھرگھر کام کی طرح لگتا ہے، لیکن دوبارہ پریوست اجزاء کی ایک پیلٹ بڑے اطلاقات میں بند کر دیتا تعلق. انگوٹھے کی ایک اچھی حکمرانی ہے تو کا ایک حصہ آپ UI کئی بار استعمال کیا جاتا ہے (`Button`, `Panel`, `Avatar`), یا اپنے طور پر پیچیدہ کافی ہے (`App`, `FeedStory`, `Comment`), یہ ایک دوبارہ پریوست اتحادی ہونے کے لئے ایک اچھا امیدوار ہیں.

## Props ہیں صرف پڑھنے کیلئے {#props-are-read-only}

آپ ایک جزو اعلان چاہے [ایک تقریب یا ایک کے طور پر class](#function-and-class-components), یہ اس کی اپنی نظر ثانی کبھی نہیں کرنا چاہیے props. اس پر غور `sum` فنکشن:

```js
function sum(a, b) {
  return a + b;
}
```

اس طرح کے افعال کو کہا جاتا ہے ["خالص"](https://en.wikipedia.org/wiki/Pure_function) وہ ان کے آدانوں تبدیل، اور ہمیشہ ایک ہی آدانوں کے لئے ایک ہی نتیجہ کے واپس کرنے کی کوشش نہیں کرتے.

یہ اس کی اپنی ان پٹ کو تبدیل کر، کیونکہ اس کے برعکس، اس تقریب نجس ہے:

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React بہت لچکدار ہے لیکن یہ ایک واحد سخت حکمرانی ہے:

**سب React اجزاء کے لئے احترام کے ساتھ خالص افعال کی طرح سلوک کرنا چاہیے ان props.**

کورس کے، درخواست UIs وقت کے ساتھ متحرک اور تبدیلی ہے. میں [next section](/docs/state-and-lifecycle.html), ہم کے ایک نئے تصور متعارف کرائے گا "state". State اجازت دیتا ہے React اجزاء اس اصول کی خلاف ورزی کے بغیر صارف کی کارروائیوں، نیٹ ورک کے جوابات، اور کچھ اور کے جواب میں وقت کے ساتھ ساتھ ان کی پیداوار کو تبدیل کرنے کی.