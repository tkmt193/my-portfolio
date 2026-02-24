import "./App.css";
import Home from "./sections/Home/Home";
import Loading from "./components/Loading/Loading";
import { useState, useEffect, useRef, useMemo } from "react";
import About from "./sections/About/About";
import Portfolio from "./sections/Portfolio/Portfolio";
import Contact from "./sections/Contact/Contact";
import type { SectionId, SectionRefs } from "./type/sections";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Introduce from "./sections/Introduce/Introduce";

function App() {
	const [active, setActive] = useState(false);
	const [homeActive, setHomeActive] = useState(false);
	const [currentSection, setCurrentSection] = useState<SectionId>("home");
	const isScrollingRef = useRef(false);

	// 1. 各Ref自体を定義
	const homeRef = useRef<HTMLElement>(null);
	const aboutRef = useRef<HTMLElement>(null);
	const portfolioRef = useRef<HTMLElement>(null);
	const contactRef = useRef<HTMLElement>(null);

	// 2. それらをまとめたオブジェクトを useMemo で固定する
	// これにより、再レンダリングされても sectionRefs は「同じもの」として扱われます
	const sectionRefs: SectionRefs = useMemo(
		() => ({
			home: homeRef,
			about: aboutRef,
			portfolio: portfolioRef,
			contact: contactRef,
		}),
		[],
	);

	/* ヘッダーからセクションの切り替え */
	const scrollToSection = (id: SectionId) => {
		const target = sectionRefs[id].current;
		if (target) {
			// ヘッダーの高さ分（例: 80px）引いてスクロール
			isScrollingRef.current = true;
			setCurrentSection(id); // 先にターゲットの色を変える

			const offset = 80;
			const elementPosition = target.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});

			// スクロール完了を検知する（スクロールが止まったらフラグを折る）
			const handleScrollEnd = () => {
				// 少し余裕を持ってフラグを戻す
				isScrollingRef.current = false;
				window.removeEventListener("scrollend", handleScrollEnd);
			};

			// 最新のブラウザなら 'scrollend' イベントが使えます
			// 非対応ブラウザを考慮するなら setTimeout(..., 800) 等でも代用可
			window.addEventListener("scrollend", handleScrollEnd);
		}
	};

	/* ローディング画面の表示 */
	useEffect(() => {
		document.body.style.overflow = "hidden";

		const showTimer = setTimeout(() => {
			setActive(true);

			// さらにアニメーションが終わるのを待ってスクロール解禁
			setTimeout(() => {
				document.body.style.overflow = "auto";
				setHomeActive(true);
			}, 800);
		}, 3000);

		return () => {
			clearTimeout(showTimer);
			document.body.style.overflow = "auto";
		};
	}, []);

	/* どのセクションにいるか取得してヘッダーメニューに渡す */
	useEffect(() => {
		const observerOptions = {
			root: null, // ビューポートを基準にする
			rootMargin: "-40% 0px -40% 0px", // 画面中央付近を通った時に反応させる
			threshold: 0,
		};

		const observerCallback = (entries: IntersectionObserverEntry[]) => {
			if (isScrollingRef.current) return;
			entries.forEach((entry) => {
				// 要素が交差（画面内に入った）したとき
				if (entry.isIntersecting) {
					// ref オブジェクトの中から、現在交差したDOM要素を探してIDを特定する
					const sectionId = Object.keys(sectionRefs).find(
						(key) => sectionRefs[key as SectionId].current === entry.target,
					) as SectionId;

					if (sectionId) {
						setCurrentSection(sectionId);
					}
				}
			});
		};

		const observer = new IntersectionObserver(
			observerCallback,
			observerOptions,
		);

		// 各セクションを監視対象に登録
		Object.values(sectionRefs).forEach((ref) => {
			if (ref.current) observer.observe(ref.current);
		});

		return () => observer.disconnect(); // クリーンアップ
	}, [sectionRefs]); // ロード完了後に監視を開始

	return (
		<>
			<Loading active={active} />
			<Header
				currentSection={currentSection}
				scrollToSection={scrollToSection}
			/>
			<div className="example">
				<Introduce active={homeActive} ref={sectionRefs.home} />
				<About ref={sectionRefs.about} />
				<Portfolio ref={sectionRefs.portfolio} />
				<Contact ref={sectionRefs.contact} />
			</div>
			<Footer />
		</>
	);
}

export default App;
