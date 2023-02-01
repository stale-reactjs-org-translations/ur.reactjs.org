---
title: تنصیب
---

<Intro>

React کو بتدریج اپنانے کے لیے شروع سے ہی ڈیزائن کیا گیا ہے۔ آپ اپنی ضرورت کے مطابق کم یا زیادہ React استعمال کر سکتے ہیں۔ چاہے آپ React کا ذائقہ حاصل کرنا چاہتے ہیں، HTML صفحہ میں کچھ تعاملات شامل کرنا چاہتے ہیں، یا ایک پیچیدہ React سے چلنے والی ایپ شروع کرنا چاہتے ہیں، یہ سیکشن شروع کرنے میں آپ کی مدد کرے گا۔

</Intro>

<YouWillLearn isChapter={true}>

* [HTML صفحہ پر React کیسے شامل کریں۔](/learn/add-react-to-a-website)
* [تنہا React پروجیکٹ کیسے شروع کریں۔](/learn/start-a-new-react-project)
* [اپنے ایڈیٹر کو کیسے ترتیب دیں۔](/learn/editor-setup)
* [React ڈویلپر ٹولز کو کیسے انسٹال کریں۔](/learn/react-developer-tools)

</YouWillLearn>

## React کوشش کرو {/*try-react*/}

React کے ساتھ کھیلنے کے لیے آپ کو کچھ بھی انسٹال کرنے کی ضرورت نہیں ہے۔ اس سینڈ باکس میں ترمیم کرنے کی کوشش کریں!

<Sandpack>

```js
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}

export default function App() {
  return <Greeting name="world" />
}
```

</Sandpack>

آپ اسے براہ راست ترمیم کر سکتے ہیں یا اوپری دائیں کونے میں "فورک" بٹن دبا کر اسے نئے ٹیب میں کھول سکتے ہیں۔

React دستاویزات میں زیادہ تر صفحات میں اس طرح کے سینڈ باکس ہوتے ہیں۔ React دستاویزات کے باہر، بہت سے آن لائن سینڈ باکسز ہیں جو React کو سپورٹ کرتے ہیں: مثال کے طور پر، [CodeSandbox](https://codesandbox.io/s/new)، [StackBlitz](https://stackblitz.com/fork/react )، یا [CodePen.](https://codepen.io/pen?&editors=0010&layout=left&prefill_data_id=3f4569d1-1b11-4bce-bd46-89090eed5ddb)

### مقامی طور پر React کو آزمائیں۔ {/*try-react-locally*/}

اپنے کمپیوٹر پر مقامی طور پر React کو آزمانے کے لیے، [یہ HTML صفحہ ڈاؤن لوڈ کریں۔](https://raw.githubusercontent.com/reactjs/reactjs.org/main/static/html/single-file-example.html) اسے اپنے کمپیوٹر میں کھولیں۔ ایڈیٹر اور آپ کے براؤزر میں!

## کسی صفحے پر React شامل کریں۔ {/*add-react-to-a-page*/}

اگر آپ کسی موجودہ سائٹ کے ساتھ کام کر رہے ہیں اور آپ کو تھوڑا سا React شامل کرنے کی ضرورت ہے، تو آپ [اسکرپٹ ٹیگ کے ساتھ React شامل کریں۔](/learn/add-react-to-a-website)

## ایک React پروجیکٹ شروع کریں۔ {/*start-a-react-project*/}

اگر آپ React کے ساتھ [اسٹینڈ اسٹون پروجیکٹ شروع کریں](/learn/start-a-new-react-project) کے لیے تیار ہیں، تو آپ ڈویلپر کے خوشگوار تجربے کے لیے کم سے کم ٹول چین ترتیب دے سکتے ہیں۔ آپ ایک ایسے فریم ورک کے ساتھ بھی شروع کر سکتے ہیں جو آپ کے لیے بہت سارے فیصلے باکس سے باہر کرتا ہے۔

## اگلے مراحل {/*next-steps*/}

سب سے اہم React کے تصورات کے دورے کے لیے [کوئیک اسٹارٹ](/learn) گائیڈ کی طرف جائیں جن کا آپ کو ہر روز سامنا ہوگا۔