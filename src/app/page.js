import styles from "./page.module.css";
import Image from 'next/image';

export default function Home() {

  return (
    <div className={styles.page}>
      <Image
        src="/ShareLah.png"
        alt="ShareLah"
        layout="fill"
        objectFit="cover"
        priority
      />
    </div>
  );
}
