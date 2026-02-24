import styles from "./About.module.css";
import * as motion from "motion/react-client";
import { useScroll, useTransform, type Variants } from "motion/react";
import background from "../../assets/background.png";

const TextAboutMe = ({
	isForward,
	isTop,
}: {
	isForward: boolean;
	isTop: boolean;
}) => {
	const initialX = isForward ? "0%" : "-50%";
	const animateX = isForward ? "-50%" : "0%";

	// 「開き」の動き（親要素が whileInView になると連動する）
	const spreadVariants: Variants = {
		offscreen: {
			y: 0,
			opacity: 1,
		},
		onscreen: {
			y: !isTop ? "100%" : "-100%",
			opacity: 1,
			transition: {
				type: "spring", // バウンスさせるための設定
				stiffness: 100, // バネの強さ（大きいほど速く動く）
				damping: 10, // バネの抵抗（小さいほどボヨヨンと長く揺れる）
				mass: 0.8, // 重さ（大きいほど慣性が働く）
				duration: 0.8, // 全体の長さの目安
			},
		},
	};

	return (
		<div className={styles.tickerContainer}>
			{/* この div が「開き」を担当 */}
			<motion.div variants={spreadVariants}>
				{/* この div が「無限ループ」を担当 */}
				<motion.div
					className={styles.tickerWrapper}
					initial={{ x: initialX }}
					animate={{ x: animateX }}
					transition={{
						x: {
							duration: 20,
							ease: "linear",
							repeat: Infinity,
						},
					}}
				>
					<pre className={styles.text}>ABOUTME ABOUTME ABOUTME</pre>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default function About({
	ref,
}: {
	ref: React.RefObject<HTMLElement | null>;
}) {
	// 説明のアニメーション
	const descVariants: Variants = {
		offscreen: {
			opacity: 0,
			scale: 0.95,
			x: "-50%",
			y: "-50%",
		},
		onscreen: {
			opacity: 1,
			scale: 1,
			x: "-50%",
			y: "-50%",
			transition: {
				duration: 0.8,
				delay: 0.6,
				ease: "easeOut",
			},
		},
	};

	// スクロール進捗を取得
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	// スクロール 0.3 から 0.6 の間で、
	// 四方の余白を 50%（中央に閉じた状態）から 0%（全開）にする
	const clipInset = useTransform(
		scrollYProgress,
		[0.4, 0.6, 1.0],
		["inset(100% 100% 100% 100%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
	);

	return (
		<motion.section
			ref={ref}
			className={styles.aboutContainer}
			initial="offscreen"
			whileInView="onscreen"
			viewport={{ once: true, amount: 0.6 }} // 0.8だと厳しすぎるので少し下げました
		>
			{/* ズームする背景要素 */}
			<motion.div className={styles.background} style={{ clipPath: clipInset }}>
				<img src={background} alt=""></img>
			</motion.div>
			<TextAboutMe isForward={true} isTop={true} />

			<motion.div
				className={styles.description}
				variants={descVariants}
				style={{ position: "absolute", top: "50%", left: "50%" }}
			>
				<span className={styles.highlight}>
					I am a web developer specializing in backend and infrastructure.
				</span>
				<h3 className={styles.techstack}>Tech Stack & Interests</h3>
				<div className={styles.stackInfo}>
					<p>Core: TypeScript / JavaScript, PHP, Python</p>
					<p>Cloud: AWS</p>
					<p>Interest: SRE, Software Architecture, DevOps, ML</p>
				</div>
			</motion.div>

			<TextAboutMe isForward={false} isTop={false} />
		</motion.section>
	);
}
