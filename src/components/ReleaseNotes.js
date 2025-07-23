import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from "react-i18next";

export default function ReleaseNotes() {
    const { darkMode } = useContext(ThemeContext);
    const { t } = useTranslation();

    const notes = [
    { date: `${t("June")} 5, 2024`, text: t("ReleaseNote.2024-06-05") },
    { date: `${t("June")} 2, 2024`, text: t("ReleaseNote.2024-06-02") },
    { date: `${t("May")} 27, 2024`, text: t("ReleaseNote.2024-05-27") },
    { date: `${t("April")} 23, 2024`, text: t("ReleaseNote.2024-04-23") },
    { date: `${t("April")} 5, 2024`, text: t("ReleaseNote.2024-04-05") },
    { date: `${t("March")} 8, 2024`, text: t("ReleaseNote.2024-03-08") },
    { date: `${t("March")} 7, 2022`, text: t("ReleaseNote.2022-03-07") },
    { date: `${t("September")} 13, 2021`, text: t("ReleaseNote.2021-09-13") },
    { date: `${t("September")} 1, 2021`, text: t("ReleaseNote.2021-09-01") },
    { date: `${t("August")} 25, 2021`, text: t("ReleaseNote.2021-08-25") },
    { date: `${t("May")} 17, 2020`, text: t("ReleaseNote.2020-05-17-1") },
    { date: `${t("May")} 17, 2020`, text: t("ReleaseNote.2020-05-17-2") },
    { date: `${t("May")} 16, 2020`, text: t("ReleaseNote.2020-05-16") },
    { date: `${t("July")} 30, 2018`, text: t("ReleaseNote.2018-07-30") },
    { date: `${t("March")} 5, 2018`, text: t("ReleaseNote.2018-03-05") },
    { date: `${t("November")} 30, 2017`, text: t("ReleaseNote.2017-11-30") },
    {
        date: `${t("December")} 22, 2016`,
        text: (
            <>
                {t("ReleaseNote.2016-12-22")}{" "}
                <Link to="/guide" className="text-[#00a877]">{t("Invoicing Guide")}</Link>.
            </>
        )
    },
    { date: `${t("September")} 12, 2016`, text: t("ReleaseNote.2016-09-12") },
    { date: `${t("November")} 25, 2015`, text: t("ReleaseNote.2015-11-25") },
    { date: `${t("October")} 23, 2015`, text: t("ReleaseNote.2015-10-23") },
    { date: `${t("August")} 28, 2015`, text: t("ReleaseNote.2015-08-28") },
    { date: `${t("July")} 13, 2015`, text: t("ReleaseNote.2015-07-13") },
    { date: `${t("June")} 27, 2015`, text: t("ReleaseNote.2015-06-27") },
    { date: `${t("February")} 13, 2015`, text: t("ReleaseNote.2015-02-13") },
    { date: `${t("February")} 6, 2015`, text: t("ReleaseNote.2015-02-06") },
    { date: `${t("February")} 5, 2015`, text: t("ReleaseNote.2015-02-05") },
    { date: `${t("November")} 14, 2014`, text: t("ReleaseNote.2014-11-14") },
    { date: `${t("November")} 10, 2014`, text: t("ReleaseNote.2014-11-10") },
    { date: `${t("September")} 8, 2014`, text: t("ReleaseNote.2014-09-08") },
    { date: `${t("August")} 29, 2014`, text: t("ReleaseNote.2014-08-29") },
    { date: `${t("May")} 7, 2014`, text: t("ReleaseNote.2014-05-07") },
    { date: `${t("March")} 20, 2014`, text: t("ReleaseNote.2014-03-20") },
    { date: `${t("March")} 10, 2014`, text: t("ReleaseNote.2014-03-10") },
    { date: `${t("January")} 18, 2014`, text: t("ReleaseNote.2014-01-18") },
    { date: `${t("January")} 15, 2014`, text: t("ReleaseNote.2014-01-15") },
    { date: `${t("December")} 3, 2013`, text: t("ReleaseNote.2013-12-03") },
    { date: `${t("September")} 25, 2013`, text: t("ReleaseNote.2013-09-25") },
    { date: `${t("July")} 31, 2013`, text: t("ReleaseNote.2013-07-31") },
    { date: `${t("July")} 28, 2013`, text: t("ReleaseNote.2013-07-28") },
    { date: `${t("July")} 25, 2013`, text: t("ReleaseNote.2013-07-25") },
    { date: `${t("July")} 16, 2013`, text: t("ReleaseNote.2013-07-16") },
    { date: `${t("June")} 19, 2013`, text: t("ReleaseNote.2013-06-19") },
    { date: `${t("May")} 10, 2013`, text: t("ReleaseNote.2013-05-10") },
    { date: `${t("May")} 7, 2013`, text: t("ReleaseNote.2013-05-07") },
    { date: `${t("May")} 1, 2013`, text: t("ReleaseNote.2013-05-01") },
    { date: `${t("April")} 30, 2013`, text: t("ReleaseNote.2013-04-30") },
    { date: `${t("April")} 26, 2013`, text: t("ReleaseNote.2013-04-26") },
    { date: `${t("March")} 24, 2013`, text: t("ReleaseNote.2013-03-24") },
    { date: `${t("January")} 15, 2013`, text: t("ReleaseNote.2013-01-15") },
    { date: `${t("June")} 6, 2012`, text: t("ReleaseNote.2012-06-06") }
];


    return (
        <div className={`flex flex-col min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-[#0e1d34]'}`}>
            <div className="px-6 md:px-20 lg:px-40 py-10 flex-grow">
                <h1 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#0e1d34]'}`}>
                    {t("Release Notes")}
                </h1>
                <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t("Read about the latest changes and improvements to help you send invoices faster.")}
                </p>

                <div className="space-y-6">
                    {notes.map((note, index) => (
                        <div key={index}>
                            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{note.date}</p>
                            <p className={`text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-black'}`}>
                                {note.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
