import fs from 'fs-extra'
import path from 'path'

export default (req, res) => {
  if (req.method == 'POST') {

    fs.mkdirSync(
      path.join(
        process.cwd(), '/media/' + req.body.path + '/' + req.body.name
      )
    )
    res.statusCode = 200;
    res.end();

  } else if (req.method == 'DELETE') {
    fs.removeSync(
      path.join(
        process.cwd(), '/media/' + req.body.path + '/' + req.body.name
      ),
    )
    res.statusCode = 200;
    res.end();

  } else if (req.method == 'PUT') {

    if (req.body.type == 'file') {
      fs.renameSync(
        path.join(
          process.cwd(), '/media/' + req.body.currPath
        ),
        path.join(
          process.cwd(), '/media/' + req.body.destPath
        )
      )
    } else {

      let origFile = path.join(
        process.cwd(), '/media/' + req.body.currPath + '/' + req.body.fileName
      )
      if (!fs.existsSync(origFile)) {
        origFile = path.join(
          process.cwd(), '/media/' + req.body.currPath + '/' + decodeURIComponent(req.body.fileName)
        )
      }

      fs.renameSync(
        origFile,
        path.join(
          process.cwd(), '/media/' + req.body.destPath + '/' + req.body.fileName
        )
      )
    }

    res.statusCode = 200
    res.end()

  } else {
    res.statusCode = 403
    res.end()
  }
}
