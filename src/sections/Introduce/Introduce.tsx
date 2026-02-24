import React from "react";
import maskGroup from "../../assets/woman.png";
import "./Introduce.css";
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
			// 子要素（h1, p, button）の開始を 0.3秒 ずつずらす
			staggerChildren: 0.3,
			delayChildren: 0.4, // 最初の要素が動き出すまでの待機時間
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
		<section ref={ref} id="home" className="introduce">
			<motion.div
				className="back"
				variants={imageVariants}
				initial="hidden"
				animate={active ? "visible" : "hidden"}
			>
				<div className="images">
					<div className="rectangle" ></div>
					<div className="div-dashed"></div>
					<div className="square" ></div>
					<img className="mask-group" alt="Ikumi Tsukamoto" src={maskGroup} />
				</div>
			</motion.div>

			<div className="foword">
				<motion.div
					className="right"
					variants={containerVariants}
					initial="hidden"
					animate={active ? "visible" : "hidden"}
				>
					<motion.button
						type="button"
						className="button"
						onClick={() => {}}
						variants={itemVariants}
					>
						<span className="text-wrapper-2">Contact Me</span>
					</motion.button>
					<motion.h1 className="text-wrapper" variants={itemVariants}>
						WEB DEVELOPER PORTFOLIO
					</motion.h1>
				</motion.div>
				<motion.div
					className="left"
					variants={nameVariants}
					initial="hidden"
					animate={active ? "visible" : "hidden"}
				>
					<div className="IKUMI-TSUKAMOTO">
						IKUMI
						<br />
						TSUKAMOTO
					</div>
				</motion.div>
			</div>
		</section>
	);
}
