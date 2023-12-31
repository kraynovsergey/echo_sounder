(function() {
	'use strict';

	const lazyLoadInstance = new LazyLoad();

	Fancybox.bind("[data-fancybox]", {});

	const data_toggle = document.querySelectorAll('[data-toggle]');
	if ( data_toggle.length > 0 ) {
		data_toggle.forEach(item => {
			gsap_data_toggle(item, document.querySelector( item.getAttribute('data-toggle') ));
		});
	}

	function gsap_data_toggle(item, target) {
		const timeline = gsap.timeline({
			paused: true
		});

		let display = 'flex';

		if ( target.hasAttribute('data-grid') ) display = 'grid';

		timeline.to(target, {
			display: display,
			opacity: 1
		});

		item.addEventListener('click', (e) => {
			e.stopPropagation();

			if ( item.classList.contains('_active') ) {
				item.classList.remove('_active');
				timeline.reverse();
			} else {
				item.classList.add('_active');
				timeline.play();
			}
		});

		document.addEventListener('click', (e) => {
			if ( !item.contains(e.target) && !target.contains(e.target) ) {
				item.classList.remove('_active');
				timeline.reverse();
			}
		});
	}

	const data_nav_item = document.querySelectorAll('[data-nav-item]');
	if ( data_nav_item.length > 0 ) {
		data_nav_item.forEach(item => {
			let timeline = gsap.timeline({
				paused: true
			});

			timeline.to(item.querySelector('[data-nav-sublist]'), {
				display: 'flex',
				opacity: 1
			});

			window.addEventListener("DOMContentLoaded", () => {
				data_nav_item_action(item, timeline);
			});

			window.addEventListener('resize', () => {
				data_nav_item_action(item, timeline);
			});

			function data_nav_item_action(item, timeline) {
				if ( document.documentElement.clientWidth >= 1100 ) {
					item.addEventListener('mouseenter', () => {
						timeline.play();
					});

					item.addEventListener('mouseleave', () => {
						timeline.reverse();
					});
				} else {
					let link = item.querySelector('[data-nav-link]');
					if ( link ) {
						link.addEventListener('click', (e) => {
							e.preventDefault();

							if ( item.classList.contains('_active') ) {
								item.classList.remove('_active');
								timeline.reverse();
							} else {
								item.classList.add('_active');
								timeline.play();
							}
						});
					}
				}
			}
		});
	}

	const data_nav = document.querySelector('[data-nav]'),
		data_header = document.querySelector('[data-header]');

	window.addEventListener("DOMContentLoaded", () => {
		setMobileHeight(data_nav, data_header);

		window.addEventListener('resize', () => {
			setMobileHeight(data_nav, data_header);
		});
	});

	function setMobileHeight(item, header) {
		if ( item && header && document.documentElement.clientWidth < 1100 )
			data_nav.style.height = (window.innerHeight * 0.01 * 100 - header.clientHeight) + 'px'
	}

	const data_home_intro_carousel = document.querySelector('[data-home-intro-carousel]');
	if ( data_home_intro_carousel ) {
		new Swiper(data_home_intro_carousel, {
			loop: false,
			navigation: {
				nextEl: document.querySelector('.home-intro__navigation .carousel__navigation._next'),
				prevEl: document.querySelector('.home-intro__navigation .carousel__navigation._prev')
			},
			on: {
				init: function (el) {
					get_params_carousel(el);
				},
				slideChange: function(el) {
					get_params_carousel(el);
				}
			}
		});

		function get_params_carousel(el) {
			let activeSlide = data_home_intro_carousel.querySelector('.home-intro__carousel-slide[data-item="'+el.activeIndex+'"]'),
				title = activeSlide.getAttribute('data-title'),
				video = activeSlide.getAttribute('data-video'),
				titleTarget = document.querySelector('.home-intro__navigation-title'),
				videoTarget = document.querySelector('.home-intro__video');
			titleTarget.innerHTML = title;
			videoTarget.href = video;
		}
	}

	/* <!--Карусель с рыбаками--> */
	const data_fishermen_swiper = document.querySelector('[data-fishermen-swiper]');
	if ( data_fishermen_swiper ) {
		new Swiper(data_fishermen_swiper, {
			slidesPerView: 'auto',
			spaceBetween: 20,
			navigation: {
				nextEl: document.querySelector('[data-fishermen-next]'),
				prevEl: document.querySelector('[data-fishermen-prev]')
			}
		});
	}

	/* <!--Карусели акции/новинки--> */
	const data_home_sales_swiper = document.querySelectorAll('[data-home-sales-swiper]');
	if ( data_home_sales_swiper.length > 0 ) {
		data_home_sales_swiper.forEach(item => {
			let item_data = +item.getAttribute('data-home-sales-swiper'),
				spv = 'auto';

			if ( item_data === 1 ) spv = 1.2;

			new Swiper(item, {
				slidesPerView: spv,
				navigation: {
					nextEl: document.querySelector('[data-home-sales-nav="'+item_data+'"] ._next'),
					prevEl: document.querySelector('[data-home-sales-nav="'+item_data+'"] ._prev')
				},
				breakpoints: {
					0: {
						spaceBetween: 20
					},
					1440: {
						spaceBetween: 35
					}
				}
			});
		});
	}

	/* <!--Табы акции/новинки--> */
	const data_home_sales_tab = document.querySelectorAll('[data-home-sales-tab]');
	if ( data_home_sales_tab.length > 0 ) {
		data_home_sales_tab.forEach(item => {
			item.addEventListener('click', () => {
				let item_data = item.getAttribute('data-home-sales-tab'),
					data_home_sales_nav = document.querySelectorAll('[data-home-sales-nav]');

				data_home_sales_actions(data_home_sales_tab, 'data-home-sales-tab', item_data);
				data_home_sales_actions(data_home_sales_nav, 'data-home-sales-nav', item_data);
				data_home_sales_actions(data_home_sales_swiper, 'data-home-sales-swiper', item_data);
			});
		});

		function data_home_sales_actions(array, attribute, item_data) {
			if ( array.length > 0 ) {
				array.forEach(row => {
					row.classList.remove('_active');
					if ( row.getAttribute(attribute) === item_data )
						row.classList.add('_active');
				});
			}
		}
	}

	/* Изменение количества */
	const product_count_btn = document.querySelectorAll('[data-product-count] button');
	if ( product_count_btn.length > 0 ) {
		product_count_btn.forEach(item => {
			item.addEventListener('click', () => {
				let input = item.closest('[data-product-count]').querySelector('input');
				if ( input ) {
					if ( item.hasAttribute('data-product-count-plus') )
						input.value = +input.value + 1;
					if ( item.hasAttribute('data-product-count-minus') && ( input.value > 1 ) )
						input.value = +input.value - 1;
				}
			});
		});
	}

	/* Раскрывающиеся пункт в "Производим эхолоты..." */
	const manufacturer = document.querySelectorAll('[data-manufacturer]');
	if ( manufacturer.length > 0 ) {
		manufacturer.forEach(item => {
			let timeline = gsap.timeline({
				paused: true
			});

			timeline.to(item.querySelector('.manufacturer__text'), {
				position: 'relative',
				left: 0,
				opacity: 1
			});

			if ( item.classList.contains('_active') ) timeline.play();

			item.addEventListener('click', () => {
				if ( item.classList.contains('_active') ) {
					item.classList.remove('_active');
					timeline.reverse();
				} else {
					item.classList.add('_active');
					timeline.play();
				}
			});
		});
	}

	/* Форма "Ответьте на 8 вопросов..." */
	const question_control = document.querySelectorAll('[data-question-control]');
	if ( question_control.length > 0 ) {
		let question_control_prev = document.querySelector('[data-question-control][data-prev]'),
			question_control_next = document.querySelector('[data-question-control][data-next]'),
			question_progress = document.querySelector('[data-step-progress]'),
			question_steps = document.querySelectorAll('[data-question-step]'),
			step_number = document.querySelector('[data-step-number]'),
			quiz_final = document.querySelector('[data-quiz-final]'),
			quiz = document.querySelector('[data-quiz]');

		question_control.forEach(item => {
			item.addEventListener('click', () => {
				let current_step = +item.getAttribute('data-step');

				if ( +current_step + 1 === 10 ) {
					let radios = document.querySelectorAll('[data-quiz-form] input[type="radio"]'),
						result = '';
					if ( radios.length > 0 ) {
						radios.forEach((item, i) => {
							if ( item.checked ) {
								if (i === 0) result = item.value;
								else result = result + '||' +  item.value;
							}
						});
					}

					let result_quiz = document.querySelector('[data-result-quiz]');
					if ( result_quiz ) result_quiz.value = result;

					Fancybox.show(
						[
							{
								src: "#modal-quiz",
								type: "inline"
							}
						]
					)
				} else {
					let prev_step = +current_step - 1,
						next_step = +current_step + 1;

					current_step === 1 ?
						question_control_prev.disabled = true : question_control_prev.disabled = false;

					question_steps.forEach(step => {
						+step.getAttribute('data-step') === current_step ?
							step.classList.add('_active') : step.classList.remove('_active');
					});

					question_control_prev.setAttribute('data-step', prev_step);
					question_control_next.setAttribute('data-step', next_step);
					question_progress.setAttribute('data-step', current_step);

					if ( step_number ) step_number.innerHTML = current_step;

					if ( current_step === 9 ) {
						quiz_final.classList.add('_active');
						quiz.classList.add('hidden');
					}
				}
			});
		});
	}

	/* Маска телефона */
	window.addEventListener("DOMContentLoaded", () => {
		[].forEach.call( document.querySelectorAll('[data-tel]'), (input) => {
			let keyCode;

			function mask(event) {
				event.keyCode && (keyCode = event.keyCode);
				let pos = this.selectionStart;
				if (pos < 3) event.preventDefault();
				let matrix = "+7 (___) ___-__-__",
					i = 0,
					def = matrix.replace(/\D/g, ""),
					val = this.value.replace(/\D/g, ""),
					new_value = matrix.replace(/[_\d]/g, function(a) {
						return i < val.length ? val.charAt(i++) || def.charAt(i) : a
					});
				i = new_value.indexOf("_");
				if (i !== -1) {
					i < 5 && (i = 3);
					new_value = new_value.slice(0, i)
				}
				let reg = matrix.substr(0, this.value.length).replace(/_+/g,
					function(a) {
						return "\\d{1," + a.length + "}"
					}).replace(/[+()]/g, "\\$&");
				reg = new RegExp("^" + reg + "$");
				if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
				if (event.type === "blur" && this.value.length < 5)  this.value = ""
			}

			input.addEventListener("input", mask, false);
			input.addEventListener("focus", mask, false);
			input.addEventListener("blur", mask, false);
			input.addEventListener("keydown", mask, false);
		});
	});

	/* Политика конфиденциальности */
	const data_policy = document.querySelectorAll('[data-policy]');
	if ( data_policy.length > 0 ) {
		data_policy.forEach(item => {
			item.addEventListener('change', () => {
				let btn_submit = item.closest('form').querySelector('button[type="submit"]');
				item.checked ? btn_submit.disabled = false : btn_submit.disabled = true;
			});
		})
	}

	/* Форма "Стать партнером.." */
	const partner_next = document.querySelector('[data-partner-next]');
	if ( partner_next ) {
		partner_next.addEventListener('click', () => {
			let partner_steps = document.querySelectorAll('[data-partner-step]'),
				partner_count = document.querySelector('[data-partner-count] span');

			partner_steps.forEach(step => {
				+step.getAttribute('data-partner-step') === 2 ?
					step.classList.add('_active') : step.classList.remove('_active');
			});

			partner_count.innerHTML = '2';
		});
	}

	/* Табы в картах офиса и сервисных центров */
	const footer_map_tabs = document.querySelectorAll('[data-footer-map-tab]');
	if ( footer_map_tabs.length > 0 ) {
		footer_map_tabs.forEach(tab => {
			tab.addEventListener('click', () => {
				let i = +tab.getAttribute('data-footer-map-tab'),
					maps = document.querySelectorAll('[data-footer-map]');

				footer_map_tabs.forEach(row => {
					+row.getAttribute('data-footer-map-tab') === i ?
						row.classList.add('_active') : row.classList.remove('_active');
				});

				if ( maps.length > 0 ) {
					maps.forEach(map => {
						+map.getAttribute('data-footer-map') === i ?
							map.classList.add('_active') : map.classList.remove('_active');
					});
				}
			});
		});
	}

	/* Табы в сравнении товаров */
	const compare_tabs = document.querySelectorAll('[data-compare-tab]');
	if ( compare_tabs.length > 0 ) {
		compare_tabs.forEach(tab => {
			tab.addEventListener('click', () => {
				let i = +tab.getAttribute('data-compare-tab'),
					compare_contents = document.querySelectorAll('[data-compare-content]');

				compare_tabs.forEach((row) => {
					+row.getAttribute('data-compare-tab') === i ?
						row.classList.add('_active') : row.classList.remove('_active');
				});

				compare_contents.forEach((content) => {
					+content.getAttribute('data-compare-content') === i ?
						content.classList.add('_active') : content.classList.remove('_active');
				});
			})
		});
	}

	/* Главная карусель в сравнении товаров */
	const compare_swiper = document.querySelectorAll('[data-compare-swiper]');
	if ( compare_swiper.length > 0 ) {
		compare_swiper.forEach(swiper => {
			let i = swiper.getAttribute('data-compare-swiper'),
				compare_block_virtual = document.querySelectorAll('[data-compare-block-swiper]');

			let swiper_main = new Swiper(swiper, {
				slidesPerView: 'auto',
				spaceBetween: 20,
				navigation: {
					nextEl: document.querySelector('[data-compare-next="'+i+'"]'),
					prevEl: document.querySelector('[data-compare-prev="'+i+'"]')
				},
				on: {
					realIndexChange: function (el) {
						let compare_block_swiper = document.querySelectorAll('[data-compare-block-swiper="'+i+'"]');
						compare_block_swiper.forEach(item => {
							new Swiper(item, {
								slidesPerView: 'auto',
								spaceBetween: 20,
								allowTouchMove: false,
								on: {
									init: function(s) {
										s.setTranslate(200);
										s.slideTo( el.activeIndex );
									}
								}
							});
						});
					},
				},
			});

			compare_block_virtual.forEach(item => {
				new Swiper(item, {
					slidesPerView: 'auto',
					spaceBetween: 20,
					allowTouchMove: false
				});
			});
		});
	}

	/* Блоки категорий в сравнении товаров */
	const compare_block = document.querySelectorAll('[data-compare-block]');
	if ( compare_block.length > 0 ) {
		compare_block.forEach(block => {
			block.addEventListener('click', () => {
				let i = block.getAttribute('data-compare-block'),
					target = document.querySelector('[data-compare-block-content="'+i+'"]');
				block.classList.toggle('_active');
				if ( target )
					target.classList.toggle('_active');
			});
		});
	}

	/* <!--Карусели с авто-шириной слайдов--> */
	const data_auto_width_swiper = document.querySelectorAll('[data-auto-width-swiper]');
	if ( data_auto_width_swiper.length > 0 ) {
		data_auto_width_swiper.forEach(swiper => {
			new Swiper(swiper, {
				slidesPerView: 'auto',
				spaceBetween: 20,
				navigation: {
					nextEl: document.querySelector(swiper.getAttribute('data-next')),
					prevEl: document.querySelector(swiper.getAttribute('data-prev'))
				}
			});
		});
	}

	/* <!--Показать еще в информационной поддержке для пользователей--> */
	const for_users_products_more = document.querySelector('[data-for-users-products-more]');
	if ( for_users_products_more ) {
		for_users_products_more.addEventListener('click', () => {
			let for_users_products = document.querySelectorAll('[data-for-users-product]');
			for_users_products_more.classList.add('hidden');
			if ( for_users_products.length > 0 ) {
				for_users_products.forEach(item => {
					item.classList.add('_active');
				});
			}
		})
	}

	/* <!--Показать еще в часто задаваемых вопросах--> */
	const faq_more = document.querySelector('[data-faq-more]');
	if ( faq_more ) {
		faq_more.addEventListener('click', () => {
			let faq = document.querySelectorAll('._hidden[data-faq]');
			if ( faq.length > 0 ) {
				faq.forEach(item => {
					item.classList.remove('_hidden');
				});
			}
			faq_more.classList.add('hidden');
		});
	}

	/* Карусель с эхолотами в демонстрации работы */
	const demonstration_swiper = document.querySelector('[data-demonstration-swiper]');
	if ( demonstration_swiper ) {
		new Swiper(demonstration_swiper, {
			slidesPerView: 1,
			spaceBetween: 0,
			navigation: {
				nextEl: document.querySelector('[data-demostration-next]'),
				prevEl: document.querySelector('[data-demostration-prev]')
			},
			on: {
				init: function(el) {
					get_demonstration_title(el);
				},
				slideChange: function(el) {
					get_demonstration_title(el);
				}
			}
		});

		function get_demonstration_title(el) {
			document.querySelector('[data-demonstration-title]').innerHTML =
				document.querySelector('[data-demonstration-swiper] .swiper-slide[data-item="'+el.activeIndex+'"]').getAttribute('data-title');
		}
	}

	/* "Погрузить" в демонстрации работы */
	const demonstration_play = document.querySelector('[data-demonstration-play]');
	if ( demonstration_play ) {
		demonstration_play.addEventListener('click', () => {
			let sounders = document.querySelector('[data-demonstration-sounders]'),
				pictures = document.querySelectorAll('.demonstration__nature-picture');

			if ( demonstration_play.classList.contains('_active') ) {
				demonstration_play.innerHTML = 'Погрузить';
			} else {
				demonstration_play.innerHTML = 'Вытащить';
			}

			if ( pictures.length > 0 ) {
				pictures.forEach(item => {
					item.classList.toggle('_active');
				});
			}

			sounders.classList.toggle('_active');
			demonstration_play.classList.toggle('_active');
		});
	}

	/* Смена сезона в демонстрации работы */
	const demonstration_season = document.querySelector('[data-demonstration-season]');
	if ( demonstration_season ) {
		demonstration_season.addEventListener('change', () => {
			let pictures = document.querySelectorAll('[data-demonstration-pictures]');
			if ( pictures.length > 0 ) {
				pictures.forEach(item => {
					item.classList.toggle('_active');
				});
			}
		});
	}

	/* Фильтр новостей */
	const blog_filter = document.querySelectorAll('[data-blog-filter]');
	if ( blog_filter.length > 0 ) {
		blog_filter.forEach(item => {
			item.addEventListener('change', () => {
				let blog_items = document.querySelectorAll('[data-blog-item]');
				blog_items.forEach(row => {
					row.getAttribute('data-blog-item').indexOf( item.value ) === -1 ?
						row.classList.add('hidden') : row.classList.remove('hidden');
				});
			});
		});
	}

	/* Показать пароль */
	const data_password = document.querySelectorAll('[data-password]');
	if ( data_password.length > 0 ) {
		data_password.forEach(item => {
			item.addEventListener('click', () => {
				let input = item.closest('fieldset').querySelector('input');
				if ( input ) {
					if ( item.classList.contains('_active') ) {
						input.setAttribute('type', 'password');
					} else {
						input.setAttribute('type', 'text');
					}
					item.classList.toggle('_active');
				}
			});
		});
	}

	/* Фильтр на мобиле */
	const catalog_aside_controls = document.querySelectorAll('[data-catalog-aside-control]');
	if ( catalog_aside_controls.length > 0 ) {
		catalog_aside_controls.forEach(item => {
			item.addEventListener('click', () => {
				let catalog_aside = document.querySelector('[data-catalog-aside]');
				if ( catalog_aside ) catalog_aside.classList.toggle('_active');
			});
		});
	}

	/* Галерея на странице товара */
	const product_gallery = document.querySelector('[data-product-gallery]'),
		product_gallery_thumbs = document.querySelector('[data-product-gallery-thumbs]');
	if ( product_gallery && product_gallery_thumbs ) {
		const product_gallery_thumbs_swiper = new Swiper(product_gallery_thumbs, {
			slidesPerView: 4,
			spaceBetween: 10,
			freeMode: true,
			watchSlidesProgress: true,
		});

		const product_gallery_swiper = new Swiper(product_gallery, {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			thumbs: {
				swiper: product_gallery_thumbs_swiper
			},
			navigation: {
				nextEl: document.querySelector('[data-product-gallery-next]'),
				prevEl: document.querySelector('[data-product-gallery-prev]')
			},
		});
	}

	/* Табы на странице продукта */
	const product_tabs = document.querySelectorAll('[data-product-tab]');
	if ( product_tabs.length > 0 ) {
		product_tabs.forEach(product_tab => {
			product_tab.addEventListener('click', () => {
				let tabs = product_tab.closest('[data-product-tabs]').querySelectorAll('[data-product-tab]'),
					tabs_content = product_tab.closest('[data-product-tabs]').querySelectorAll('[data-product-content]'),
					i = +product_tab.getAttribute('data-product-tab');

				if ( tabs.length > 0 ) {
					tabs.forEach(tab => {
						+tab.getAttribute('data-product-tab') === i ?
							tab.classList.add('_active') : tab.classList.remove('_active');
					});
				}

				if ( tabs_content.length > 0 ) {
					tabs_content.forEach(tab_content => {
						+tab_content.getAttribute('data-product-content') === i ?
							tab_content.classList.add('_active') : tab_content.classList.remove('_active');
					});
				}
			})
		});
	}

	/* Оформление заказа */
	const delivery_types = document.querySelectorAll('[data-delivery-type]'),
		delivery_subtypes = document.querySelectorAll('[data-delivery-subtype]'),
		delivery_rights = document.querySelectorAll('[data-delivery-right]');
	if ( delivery_types.length > 0 && delivery_subtypes.length > 0 ) {
		delivery_types.forEach(delivery_type => {
			delivery_type.addEventListener('change', () => {
				delivery_subtypes.forEach(delivery_subtype => {
					if ( delivery_subtype.getAttribute('data-delivery-subtype') === delivery_type.value) {
						let radios = delivery_subtype.querySelectorAll('[data-delivery-radio]');
						delivery_subtype.classList.add('_active');

						if ( radios.length > 0 ) {
							let radio_value = '';
							radios.forEach(radio => {
								if ( radio.checked ) radio_value = radio.value;

								radio.addEventListener('change', () => {
									radio_value = radio.value;
									set_delivery_right(delivery_rights, radio_value);
								});
							});

							set_delivery_right(delivery_rights, radio_value);

						} else {
							set_delivery_right(delivery_rights, delivery_type.value);
						}
					} else {
						delivery_subtype.classList.remove('_active');
					}
				});
			});
		});

		function set_delivery_right(delivery_rights, radio_value) {
			delivery_rights.forEach(delivery_right => {
				delivery_right.getAttribute('data-delivery-right') === radio_value ?
					delivery_right.classList.add('_active') : delivery_right.classList.remove('_active');
			});
		}
	}

	const get_order_next = document.querySelector('[data-order-next]');
	if ( get_order_next ) {
		get_order_next.addEventListener('click', () => {
			let delivery_stage = document.querySelectorAll('[data-order-delivery]'),
				payment_stage = document.querySelectorAll('[data-order-payment]');

			if ( delivery_stage.length > 0 ) {
				delivery_stage.forEach(item => {
					item.classList.remove('_active');
				});
			}

			if ( payment_stage.length > 0 ) {
				payment_stage.forEach(item => {
					item.classList.add('_active');
				});
			}
		});
	}

	/* Спойлер  */
	const spoiler = document.querySelectorAll('[data-spoiler]');
	if ( spoiler.length > 0 ) {
		spoiler.forEach(item => {
			item.addEventListener('click', () => {
				let target = document.querySelector( item.getAttribute('data-spoiler') );
				if ( target ) target.classList.add('_active');
				item.classList.add('_hidden');
			});
		});
	}

	/* Одновременное открытие закрытие и открытие следующего модального окна */
	const double_fancybox = document.querySelectorAll('[data-fancybox-double]');
	if ( double_fancybox.length > 0 ) {
		double_fancybox.forEach(item => {
			item.addEventListener('click', (e) => {
				e.preventDefault();
				Fancybox.close();
				Fancybox.show(
					[
						{
							src: item.getAttribute('data-fancybox-double'),
							type: 'inline'
						}
					]
				)
			});
		});
	}

	/* Запрет фэнсибокса на мобиле */
	const product_page_fancy = document.querySelectorAll('.product-page__picture');
	if ( product_page_fancy.length > 0 ) {
		product_page_fancy.forEach(item => {
			item.addEventListener('click', (e) => {
				if ( document.documentElement.offsetWidth < 992 ) e.preventDefault();
			});
		});
	}

	/* Поиск по регионам */
	const region_search = document.querySelector('[data-region-search]');
	if (region_search) {
		let form = region_search.closest('form'),
			regions = document.querySelectorAll('[data-region-link]');

		form.addEventListener('submit', (e) => {
			e.preventDefault();
		});

		region_search.addEventListener('keyup', () => {
			let val = region_search.value.toLowerCase();

			if (regions.length > 0) {
				regions.forEach(region => {
					let region_name = region.innerHTML.toLowerCase();

					if (region_name.includes(val)) region.closest('.shops__region').classList.remove('_hidden');
						else region.closest('.shops__region').classList.add('_hidden');
				});

				let letters = document.querySelectorAll('.shops__letter');
				if (letters.length > 0) {
					letters.forEach(item => {
						let childs = item.querySelectorAll('.shops__region:not(._hidden)');
						if (childs.length === 0) item.classList.add('_hidden');
							else item.classList.remove('_hidden');
					});
				}
			}
		});
	}

})();