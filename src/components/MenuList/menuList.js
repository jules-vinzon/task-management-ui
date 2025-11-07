import React from 'react';
import MenuListStyled from './menuList.style';

export default function MenuList (props) {
  let size = null;
  switch (props.size) {
    case 'small':
      size = 'small';
      break;
    case 'medium':
      size = 'medium';
      break;
    case 'large':
      size = 'large';
      break;
    default:
      size = 'default';
      break;
  }
  const title = props.title
  const subtitle = props.subTitle

  const selectedClass = props.selected ? `selected` : ``
  const editModeClass = props.editMode ? `editMode` : ``
  const disableCss = props.disabled ? `disabled` : ``
  const editModeActionsClass = props.editMode ? `editModeActions` : ``
  return (
    <MenuListStyled className={`isoMenuListWrapper ${props.className}`}>
      <button
        disabled={props.disabled ? true : false}
        type="button"
        onClick={event => {
          if (props.onClick) {
            if (!props.editMode) {
              props.onClick(event);
            }
          }
        }}
        className={`${size} ${selectedClass} ${editModeClass} ${disableCss}`}
      >
        {props.leftIcon ? <div className="btnIcon">
          {typeof props.leftIcon === 'object' ? props.leftIcon : <i className={props.leftIcon} />}
        </div> : ''}
        <div className={`btnLabelHolder ${props.leftIcon ? 'withIcon' : ''}`}>
          <div className="btnTitle">
            <div className="btnLblWidth">{title}</div>
          </div>
          {props.subTitle ? <div className="btnSubTitle">{subtitle}</div> : ''}
        </div>
      </button>
      <div className={`actions ${editModeActionsClass}`}>
        {props.editModeToolbar}
      </div>
    </MenuListStyled>
  );
}
