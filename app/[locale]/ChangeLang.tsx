import React from 'react'
import Link from 'next/link';

const ChangeLang = ({locale} : {locale : string}) => {
  return (
    <div>ChangeLang {locale}</div>
  )
}

export default ChangeLang