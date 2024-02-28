import React from 'react'

function Popups(props) {
  return  (props.trigger) ? (
    <div>
        <div>
          {props.children}
        </div>
    </div>
  ) : "";
}

export default Popups