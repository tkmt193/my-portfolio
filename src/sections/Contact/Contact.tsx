import styles from "./Contact.module.css";
import { motion, useScroll, useTransform } from "motion/react";
import car from "../../assets/car.png";

const links = [
	{
		name: "X (Twitter)",
		id: "@your_id",
		url: "https://x.com/your_id",
		tag: "Updates",
		icon: "fa-x-twitter",
	},
	{
		name: "LinkedIn",
		id: "Display Name",
		url: "https://linkedin.com/in/your_id",
		tag: "Career",
		icon: "fa-linkedin-in",
	},
	{
		name: "GitHub",
		id: "your_id",
		url: "https://github.com/your_id",
		tag: "Code",
		icon: "fa-github",
	},
	{
		name: "Gmail",
		id: "your.email@gmail.com",
		url: "mailto:your.email@gmail.com",
		tag: "Inquiry",
		icon: "fa-envelope",
	},
];

export default function Contact({
	ref,
}: {
	ref: React.RefObject<HTMLElement | null>;
}) {
	const { scrollYProgress } = useScroll({
		target: ref,
		// セクションが画面に入りきったところから、出始めるところまでを監視
		offset: ["start start", "end end"],
	});

	// 背景パネル：左外(-100%) から 右端(100%) まで一気にスライドさせる
	// [0, 1] の間で数値を調整して「幕が閉まりきるタイミング」を制御
	const xBackground = useTransform(scrollYProgress, [0, 0.5], ["-100%", "0%"]);

	return (
		<section ref={ref} className={styles.container}>
			{/* <p>contact</p> */}
			<div className={styles.stickyWrapper}>
				{/* 1. 下層：最初から見えているコンテンツ */}
				<div className={styles.baseContent}>
					<p className={styles.contactText}>
						Please feel free to contact us. We will usually respond ASAP.
					</p>
				</div>

				{/* 2. 上層：左から右へ上書きしていく幕 */}
				<motion.div style={{ x: xBackground }} className={styles.bgPanel}>
					<div className={styles.innerContent}>
						<div className={styles.header}>
							<h1>CONTACT</h1>
							<p>
								Please feel free to contact us. We will usually respond ASAP.
							</p>
						</div>
						<div className={styles.linkList}>
							{links.map((link) => (
								<a
									key={link.name}
									href={link.url}
									target="_blank"
									rel="noopener"
									className={styles.linkItem}
								>
									<div className={styles.iconBox}>
										<i
											className={`fa-brands ${link.icon} ${link.name === "Gmail" ? "fa-regular" : ""}`}
										></i>
									</div>
									<div className={styles.info}>
										<span className={styles.linkName}>{link.name}</span>
										<span className={styles.linkId}>{link.id}</span>
									</div>
									<span className={styles.labelTag}>{link.tag}</span>
								</a>
							))}
						</div>
					</div>
					<motion.div
						className={styles.carWrapper}
						initial={{ opacity: 0, y: "-50%", x: "-10%" }}
						whileInView={{
							opacity: 1,
							x: "0%",
							y: ["-50%", "-53%", "-50%", "-47%", "-50%"],
						}}
						transition={{
							opacity: {
								duration: 0.5,
								ease: "easeInOut",
							},
							x: {
								duration: 0.5,
								ease: "easeInOut",
							},
							y: {
								duration: 0.8,
								repeat: Infinity,
								ease: "linear",
							},
						}}
						// 幕の端っこなので amount: "some" または 0.1 くらいがスムーズです
						viewport={{ once: true, amount: 0.8 }}
					>
						<img src={car} alt="走行する車" className={styles.carImage} />
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
