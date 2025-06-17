import Store from "../../Store";

function SettingsFooter () {
    const language = Store((state) => state.language)
    return (
        <div className="footer">
            <p>{language === "en"
                ? <>Your API Key will be stored at your Local Storage.</>
                : <>API Anahtarınız tarayıcınızın hafızasına <br /> (Local Storage)  kaydedilecektir.</>}
            </p>
        </div>
    )
}

export default SettingsFooter;