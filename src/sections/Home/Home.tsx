import styles from "./Home.module.css";
import type { Variants } from "motion/react";
import * as motion from "motion/react-client";
import woman from "../../assets/woman.png";

const imageVariants: Variants = {
	hidden: { opacity: 0, x: 20 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.8,
			ease: "easeOut",
			// テキストの開始（delayChildren: 0.2）よりも早く出す
			delay: 0,
		},
	},
};

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			// 子要素（h1, p, button）の開始を 0.3秒 ずつずらす
			staggerChildren: 0.3,
			delayChildren: 0.2, // 最初の要素が動き出すまでの待機時間
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, x: -20 }, // 20px下から
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.6, ease: "easeOut" },
	},
};

export default function Home({
	active,
	ref,
}: {
	active: boolean;
	ref: React.RefObject<HTMLElement | null>;
}) {
	return (
		<section ref={ref} id="home" className={styles.homeSection}>
			<div className={styles.container}>
				{/* 右側のコンテンツ */}
				<div className={styles.rightContent}>
					<motion.div
						className={styles.imageWrapper}
						variants={imageVariants}
						initial="hidden"
						animate={active ? "visible" : "hidden"}
					>
						<div className={styles.imageDecoration}></div>
						<img
							src={woman}
							alt="Ikumi Tsukamoto"
							className={styles.profileImage}
						/>
					</motion.div>
				</div>
				{/* 左側のコンテンツ */}
				<motion.div
					className={styles.leftContent}
					variants={containerVariants}
					initial="hidden"
					animate={active ? "visible" : "hidden"}
				>
					<motion.h1 variants={itemVariants}>
						Ikumi Tsukamoto
						<br />
						Web Developer
						<br />
						Official Site
					</motion.h1>

					<motion.p className={styles.description} variants={itemVariants}>
						Hi, I'm a Frontend Developer based in Tokyo. I specialize in
						building clean, performant, and user-centric web applications with
						React and modern CSS.
					</motion.p>

					<motion.button
						type="button"
						variants={itemVariants}
						className={styles.contactButton}
						initial={{
							scale: 1,
							rotate: 0,
						}}
						whileHover={{
							scale: 1.5,
							rotate: -5,
						}}
						whileTap={{ scale: 0.95, rotate: 0 }}
					>
						Contact Me
					</motion.button>
				</motion.div>
			</div>
		</section>
	);
}
