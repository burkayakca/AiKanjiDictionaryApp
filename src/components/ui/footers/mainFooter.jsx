function MainFooter () {
    return (
        <div className="footer">
            <p>© {new Date().getFullYear()} <a href="https://www.github.com/burkayakca/AiKanjiDictionaryApp"> burkayakca</a>  / Licensed under MIT <br />Stroke Animations: © 2018 <a href="https://www.hanziwriter.org">Hanzi Writer</a> <br/> Uses Gemini API by Google</p>
        </div>
    )
}


export default MainFooter;