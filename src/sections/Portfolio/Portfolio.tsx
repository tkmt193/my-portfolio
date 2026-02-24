import styles from "./Portfolio.module.css";
import * as motion from "motion/react-client";

interface CardProps {
	category: string;
	title: string;
	description: string;
	imageText: string;
}

function PortfolioCard({ category, title, description, imageText }: CardProps) {
	return (
		<motion.div
			className={styles.card}
			whileHover={{
				scale: 1.3,
			}}
		>
			<div className={styles.cardImg}>
				<span>{imageText}</span>
			</div>
			<div className={styles.cardBody}>
				<span className={styles.cardCategory}>{category}</span>
				<h3 className={styles.cardTitle}>{title}</h3>
				<p className={styles.cardDescription}>{description}</p>
			</div>
		</motion.div>
	);
}

const works = [
	{
		id: "1",
		category: "WEB",
		title: "My Portfolio",
		description: "A web portfolio built with React",
		imageText: "Concept Design",
	},
	{
		id: "2",
		category: "WEB",
		title: "Coming Soon...",
		description: "I am currently working on a new project.",
		imageText: "Web Development",
	},
	{
		id: "3",
		category: "WEB",
		title: "Coming Soon...",
		description: "I am currently working on a new project.",
		imageText: "Web Development",
	},
	{
		id: "4",
		category: "WEB",
		title: "Coming Soon...",
		description: "I am currently working on a new project.",
		imageText: "Web Development",
	},
	{
		id: "5",
		category: "WEB",
		title: "Coming Soon...",
		description: "I am currently working on a new project.",
		imageText: "Web Development",
	},
];

export default function Portfolio({
	ref, // ref は予約語回避のため名前を変えて受け取るのが安全
}: {
	ref: React.RefObject<HTMLElement | null>;
}) {
	return (
		<section ref={ref} className={styles.portfolioContainer}>
			{/* ヘッダー部分は中央揃えの枠内に置く */}
			<div className={styles.sectionHeader}>
				<h2>Selected Works</h2>
			</div>

			{/* アニメーション部分は画面幅いっぱいの枠に入れる */}
			<div className={styles.tickerWrapper}>
				<motion.div
					className={styles.worksGrid}
					animate={{ x: ["0%", "-50%"] }} // 配列形式で指定するとより確実
					transition={{
						duration: 20,
						ease: "linear",
						repeat: Infinity,
					}}
				>
					{/* 1セット目 */}
					{works.map((work) => (
						<PortfolioCard key={`first-${work.id}`} {...work} />
					))}
					{/* 2セット目 */}
					{works.map((work) => (
						<PortfolioCard key={`second-${work.id}`} {...work} />
					))}
				</motion.div>
			</div>
		</section>
	);
}
