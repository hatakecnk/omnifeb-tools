import ytdl from "ytdl-core"

export default async function handler(req, res) {

    const url = req.query.url

    if (!url) {
        return res.status(400).json({
            error: "missing url"
        })
    }

    try {

        const info = await ytdl.getInfo(url)

        const format = ytdl.chooseFormat(info.formats, {
            quality: "18"
        })

        res.status(200).json({
            title: info.videoDetails.title,
            download: format.url
        })

    } catch (e) {

        res.status(500).json({
            error: "failed to fetch video"
        })

    }

}