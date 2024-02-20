import React from 'react'
interface TitleProps {
    title: string
}
const Title : React.FC<TitleProps>= ({title}) => {
  return (
    <div className="text-text01 text-lg">{title}</div>
  )
}

export default Title