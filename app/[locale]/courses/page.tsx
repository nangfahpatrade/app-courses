import { useTranslations } from "next-intl"


const HomePage = () => {
  const t = useTranslations("CoursesPage")
  return (
    <div>text : {t("title")}</div>
  )
}

export default HomePage