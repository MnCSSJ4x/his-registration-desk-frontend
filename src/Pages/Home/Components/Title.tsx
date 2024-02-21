import React from 'react'
interface TitleProps {
    title: string
}
const Title : React.FC<TitleProps>= ({title}) => {
  return (
    <div className="flex flex-col items-center text-text01 text-4xl px-4 font-bold">{title}</div>
  )
}

export default Title