import { useState } from 'react';
import classNames from 'classnames/bind';
import style from './MovieFAQ.module.css';

const cx = classNames.bind(style);

function MovieFAQ({ faqs }) {
    const [openIds, setOpenIds] = useState([]);

    if (!faqs || faqs.length === 0) return null;

    const toggleFaq = (id) => {
        setOpenIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    return (
        <section className={cx('faq-section')}>
            <h2 className={cx('section-title')}>Hỏi đáp thường gặp</h2>

            <div className={cx('faq-list')}>
                {faqs.map((faq) => {
                    const isOpen = openIds.includes(faq.id);
                    return (
                        <div key={faq.id} className={cx('faq-item', { active: isOpen })}>
                            <button
                                type="button"
                                className={cx('faq-header')}
                                onClick={() => toggleFaq(faq.id)}
                            >
                                <span className={cx('faq-question')}>{faq.question}</span>
                                <i
                                    className={cx(
                                        'fa-solid fa-chevron-down',
                                        'faq-arrow',
                                        { rotated: isOpen }
                                    )}
                                ></i>
                            </button>

                            {isOpen && (
                                <div className={cx('faq-body')}>
                                    <p className={cx('faq-answer')}>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default MovieFAQ;
