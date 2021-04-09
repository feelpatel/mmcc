import React,{useState, forwardRef, useImperativeHandle} from 'react';
import PropTypes from 'prop-types'
const FancyBox = forwardRef((props,ref)=>{
    const {children,caption,source,defaultWidth,defaultHeight} = props;
    const [showFancyBox, setFancyBoxShow] = useState(false) 
    console.log(props.props," props  ")
    const openFancyBox=()=>{
        setFancyBoxShow(true)
    } 
    const handleClickBox=()=>{
        setFancyBoxShow(false)
    }
    const closeFancyBox=()=>{
        setFancyBoxShow(false)
    }

    useImperativeHandle(ref, () => ({
        openFancyBox(){
          setFancyBoxShow(true)
        }
    })); 
    
    return(
        <>  
            { <a className="btn-play zoomIn" onClick={()=>openFancyBox()}>
                  <i className='bx bx-play'></i>
              </a>  }
            {showFancyBox
            ? (
              <div onClick={()=>handleClickBox()} className="fancybox-container fancybox-show-caption fancybox-is-open fancybox-show-toolbar" role="dialog" tabIndex={-1} id="fancybox-container-7" style={{transitionDuration: '366ms'}}>
                <div className="fancybox-bg" ></div>
                <div className="fancybox-inner">     
                  <div className="fancybox-toolbar">
                    <button onClick={()=>closeFancyBox()} data-fancybox-close className="fancybox-button fancybox-button--close" title="Close">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z" />
                      </svg>
                    </button>
                  </div>             
                  <div className="fancybox-stage">
                    <div className="fancybox-slide fancybox-slide--video fancybox-slide--current fancybox-slide--complete"  >
                      <div className="fancybox-content"  >
                        <iframe className="fancybox-iframe" allowFullScreen="allowfullscreen" allow="autoplay; fullscreen" 
                        src={props.props.source} scrolling="no" />
                      </div>                      
                    </div>
                  </div>
                  <div className="fancybox-caption fancybox-caption--separate">
                    <div className="fancybox-caption__body">
                      {caption}
                    </div>
                  </div>                 
                </div>
              </div>
            ) : null}
        </>
    )
})

FancyBox.defaultProps = {
  caption:'How to Add Project In Master Casting and Cad Website | Chicago',
  //source:'https://www.youtube.com/embed/uiixfpTYhtE?autoplay=1',
  defaultWidth:800,
  defaultHeight:450,
  openFancyBox: () => {},
  closeFancyBox: ()=>{},
}

/**
 * @param propTypes
 * It indicates type and validation of every prop types
 */

FancyBox.propTypes = {
  source:PropTypes.string,
  openFancyBox:PropTypes.func
}
export {
  FancyBox
}