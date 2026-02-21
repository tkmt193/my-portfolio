import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import fusenGirl from "../../assets/fusen.png";
import styles from "./Girl.module.css"; // ファイル名を修正（modules.css -> module.css）
import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";

const squareVariants: Variants = {
	offscreen: {
		opacity: 1,
		x: 100, // 左端からスタート
		rotate: 15, // 左に傾いた状態からスタート
	},
	onscreen: {
		opacity: 1,
		// 配列を使わず「目標地点（右端）」だけを指定する
		x: -80,
		rotate: -15,
		transition: {
			// duration 2.5秒で片道、往復で5秒のサイクル
			duration: 2.5,
			repeat: Infinity,
			repeatType: "mirror", // 行って戻ってを繰り返す
			ease: "easeInOut",
		},
	},
};

export default function Girl() {
	// 40個の四角形を生成
	const squares = [...Array(30)].map((_, i) => (
		<p key={i} className={styles.square}></p>
	));

	const targetRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start end", "end start"], // セクションが見え始めてから終わるまで
	});

	// スクロールが進む(0から1)につれて、x座標を 0px から 200px に移動させる
	// これにより「右下に流れていく」ような軌道になります
	const scrollX = useTransform(scrollYProgress, [0, 1], [0, 200]);

	return (
		<section id="girl" className={styles.girlContainer}>
			{/* 左サイド */}
			<div className={styles.itemSide}>{squares}</div>

			{/* 中央コンテンツ */}
			<div className={styles.itemCenter}>
				<div className={styles.stickyWrapper}>
					<motion.div
						style={{ x: scrollX }}
						initial="offscreen"
						whileInView="onscreen"
						viewport={{ once: true, amount: 0.6 }}
					>
						<motion.img
							src={fusenGirl}
							variants={squareVariants}
							className={styles.girlImage}
							alt="Fusen Girl"
						/>
					</motion.div>
				</div>
			</div>

			{/* 右サイド */}
			<div className={styles.itemSide}>{squares}</div>
		</section>
	);
}
