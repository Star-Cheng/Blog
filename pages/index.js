import Image from 'next/image'
import styles from '../styles/Home.module.css'

function HomePage() {
  return (
    <div className={styles.container}>
      <h1>欢迎来到我的主页</h1>
      <div className={styles.avatarWrapper}>
        <Image
          src="/images/mingren.png"
          alt="我的头像"
          width={200}
          height={200}
          layout="responsive"
          className={styles.avatar}
        />
      </div>
    </div>
  )
}

export default HomePage
