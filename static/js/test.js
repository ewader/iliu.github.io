// 简单的测试脚本
console.log('test.js 已加载');
console.log('document.readyState:', document.readyState);

// 测试 DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded 事件触发');
    console.log('document.getElementById("theme-toggle"):', document.getElementById('theme-toggle'));
});

// 测试立即执行
console.log('立即执行 - theme-toggle:', document.getElementById('theme-toggle'));

// 测试延迟执行
setTimeout(function() {
    console.log('setTimeout 延迟 100ms - theme-toggle:', document.getElementById('theme-toggle'));
}, 100);

setTimeout(function() {
    console.log('setTimeout 延迟 500ms - theme-toggle:', document.getElementById('theme-toggle'));
}, 500);