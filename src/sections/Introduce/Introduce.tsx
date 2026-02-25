import type React from "react";
import maskGroup from "../../assets/woman.png";
import styles from "./Introduce.module.css";
import type { Variants } from "motion/react";
import * as motion from "motion/react-client";

const imageVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: "easeOut",
			delay: 0,
		},
	},
};

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.3,
			delayChildren: 0.4,
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, x: -20 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.6, ease: "easeOut" },
	},
};

const nameVariants: Variants = {
	hidden: { opacity: 0, y: -20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: "easeOut",
			delay: 0.2,
		},
	},
};

export default function Introduce({
	active,
	ref,
}: {
	active: boolean;
	ref: React.RefObject<HTMLElement | null>;
}) {
	return (
		<section ref={ref} id="home" className={styles.introduce}>
			<motion.div
				className={styles.back}
				variants={imageVariants}
				initial="hidden"
				animate={active ? "visible" : "hidden"}
			>
				<div className={styles.images}>
					<div className={styles.rectangle}></div>
					<div className={styles.divDashed}></div>
					<div className={styles.square}></div>
					<img
						className={styles.maskGroup}
						alt="Ikumi Tsukamoto"
						src={maskGroup}
					/>
				</div>
			</motion.div>

			<div className={styles.foword}>
				<motion.div
					className={styles.right}
					variants={containerVariants}
					initial="hidden"
					animate={active ? "visible" : "hidden"}
				>
					<motion.button
						type="button"
						className={styles.button}
						onClick={() => {}}
						variants={itemVariants}
					>
						<span className={styles.textWrapper2}>Contact Me</span>
					</motion.button>
					<motion.h1 className={styles.textWrapper} variants={itemVariants}>
						WEB DEVELOPER PORTFOLIO
					</motion.h1>
				</motion.div>
				<motion.div
					className={styles.left}
					variants={nameVariants}
					initial="hidden"
					animate={active ? "visible" : "hidden"}
				>
					<div className={styles.IKUMITSUKAMOTO}>
						IKUMI
						<br />
						TSUKAMOTO
					</div>
				</motion.div>
			</div>
		</section>
	);
}
