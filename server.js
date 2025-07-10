const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(express.static('public'));

// 日期解析API
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  // 处理空参数，返回当前时间
  if (!dateParam) {
    date = new Date();
  } else {
    // 尝试解析Unix时间戳（数字或字符串形式）
    const unixTimestamp = parseInt(dateParam);
    if (!isNaN(unixTimestamp) && String(unixTimestamp) === dateParam) {
      date = new Date(unixTimestamp);
    } else {
      // 尝试解析日期字符串
      date = new Date(dateParam);
    }
  }

  // 验证日期有效性
  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});    