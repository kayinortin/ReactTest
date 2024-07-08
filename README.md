# 響應式數據表格組件 (DataTable)

## 專案概述

使用 React 和 Material-UI 開發。它能夠在桌面和移動設備上提供完整的用戶體驗，具有靈活的排序、分頁和樣式定製功能。

## 主要特性

1. 響應式設計
   - 在桌面設備上顯示為傳統表格
   - 在移動設備上轉換為卡片式佈局

2. 靈活的排序功能
   - 支援單列排序
   - 可自定義初始排序列和方向

3. 分頁功能
   - 可配置每頁顯示的行數
   - 支援頁面導航

4. 自定義樣式
   - 支援為每行設置自定義樣式
   - 保留預設的灰白相間背景色

5. 互動反饋
   - 行懸停效果
   - 點擊反饋（尤其在移動版中）

6. 高度可定製
   - 可自定義列的渲染方式
   - 支援行點擊事件處理

## 技術

- React
- Material-UI
- Styled-components（用於樣式定製）

## 使用示例

```jsx
import DataTable from './components/DataTable';

const columns = [
  { id: 'name', label: '姓名', render: row => row.name, getValue: row => row.name },
  { id: 'age', label: '年齡', render: row => row.age, getValue: row => row.age },
  // ... 其他列定義
];

const data = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Henry', age: 25 },
  // ... 其他數據
];

const MyComponent = () => (
  <DataTable
    columns={columns}
    data={data}
    enableSort={true}
    enablePagination={true}
    initialSortColumn="name"
    getRowStyle={row => ({ backgroundColor: row.age > 30 ? '#f0f0f0' : 'inherit' })}
    onRowClick={row => console.log('點擊:', row)}
  />
);