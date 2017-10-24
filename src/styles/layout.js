import { StyleSheet } from 'react-native';


const xs = 4;
const sm = 6;
const md = 10;
const lg = 16;
const xl = 24;
const xxl = 32;
const xxxl = 40;
const xxxxl = 60;

const stringSizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl', 'xxxxl'];

function createStyles(styleNames) {
  let styles = {};
  stringSizes.forEach((size) => {
    let style = {};
    styleNames.forEach((styleName) => {
      style[styleName] = eval(size);
    })
    styles[size] = style;
  });
  return StyleSheet.create(styles);
}

const margins = {
  marginTop: createStyles(['marginTop']),
  marginBottom: createStyles(['marginBottom']),
  marginLeft: createStyles(['marginLeft']),
  marginRight: createStyles(['marginRight']),
  marginTopBottom: createStyles(['marginTop', 'marginBottom']),
  marginLeftRight: createStyles(['marginLeft', 'marginRight']),
}

const layoutStyles = StyleSheet.create({
  flexCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export {
  margins, 
  layoutStyles,
};
