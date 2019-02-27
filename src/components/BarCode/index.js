import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import JsBarcode from 'jsbarcode';

const BarCode = (props) => {
  const [barCodeRef, setBarCodeRef] = useState(null);
  const {
    barCode, displayValue, background, lineColor, width, height,
    margin, text, fontSize, textPosition, textMargin,
  } = props;
  const drawBarCode = () => {
    JsBarcode(
      barCodeRef, barCode,
      {
        displayValue: displayValue || false, // 是否显示原始值
        background: background || '#fff', // 背景色
        lineColor: lineColor || 'rgba(0, 0, 0, 1)', // 线条颜色
        width: width || 2, // 线条宽度
        height: height || 100, // 线条高度度
        margin: margin || 10, // 条形码外边距
        text: text || '出库验收单', // 自定义原始值
        fontSize: displayValue ? (fontSize || 14) : 0,
        textPosition: textPosition || 'top',
        textMargin: displayValue ? (textMargin || 4) : 0,
      },
    );
  };
  useEffect(() => {
    // eslint-disable-next-line
    barCode && drawBarCode();
  }, [barCode]);
  return (
    <svg ref={ref => setBarCodeRef(ref)} />
  );
};

BarCode.propTypes = {
  barCode: PropTypes.string,
  displayValue: PropTypes.bool,
  background: PropTypes.string,
  lineColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.number,
  text: PropTypes.string,
  fontSize: PropTypes.number,
  textPosition: PropTypes.string,
  textMargin: PropTypes.number,
};

export default BarCode;
