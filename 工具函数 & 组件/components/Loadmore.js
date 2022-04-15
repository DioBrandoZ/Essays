import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types'
import s from './index.module.css';

let scrollTimer = null;

/**
 * @param {func} onReachBottom 触底回调函数
 * @param {string} domId 监听滚动的dom
 * @param {boolean} hasMore 是否还可以加载
 * @param {string} customNoMoreText 没有更多时的提示文案 
 */

const LoadMore = ({ onReachBottom, domId, hasMore, customNoMoreText }) => {
  const isLoadingMoreRef = useRef(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleScroll = () => {
    if (scrollTimer) clearTimeout(scrollTimer)
    let height;
    let curPos;
    let docLength;
    if (domId) {
      const dom = document.getElementById(domId);
      height = dom.getBoundingClientRect().height;
      curPos = dom.scrollTop;
      docLength = dom.scrollHeight;
    } else {
      height = window.screen.height;
      curPos = window.scrollY;
      docLength = window.document.body.scrollHeight;
    }
    if (hasMore && !isLoadingMoreRef.current && (curPos + height >= docLength - 20)) {
      scrollTimer = setTimeout(() => {
        isLoadingMoreRef.current = true
        setIsLoadingMore(true)
        onReachBottom().then(() => {
          isLoadingMoreRef.current = false
          setIsLoadingMore(false)
          clearTimeout(scrollTimer)
        })
      }, 300)
    }
  }
  
  useEffect(() => {
    let node = window
    if(domId) {
      node = document.getElementById(domId)
    }
    node.addEventListener('scroll', handleScroll)
    return () => { node.removeEventListener('scroll', handleScroll) }
  }, [hasMore])

  const renderCont = () => {
    if (isLoadingMore) {
      return <div className={s.loadText}>正在加载...</div>
    }
    return hasMore ?
      <div className={s.loadText}>&nbsp;</div> :
      <div className={s.loadText}>{customNoMoreText}</div>
  }

    
  return (
    <div className={s.loadMore}>
      { renderCont() }
    </div>
  )
}

LoadMore.propTypes = {
  onReachBottom: PropTypes.func,
  domId: PropTypes.string,
  hasMore: PropTypes.bool,
  customNoMoreText: PropTypes.string
}

LoadMore.defaultProps = {
  onReachBottom: () => {},
  domId: '',
  hasMore: false,
  customNoMoreText: '没有更多了',
}

export default LoadMore;
