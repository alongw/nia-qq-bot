import * as shell from 'shelljs'

// 检测并创建目录，如果目录不存在
const createDirectoryIfNotExists = (dirPath: string) => {
  if (!shell.test('-d', dirPath)) {
    shell.mkdir('-p', dirPath)
  }
}

// 删除目录下的所有内容，保留目录本身
const deleteFolderContents = (folderPath: string) => {
  if (shell.test('-d', folderPath)) {
    shell.rm('-rf', `${folderPath}/*`)
  }
}

// 复制整个文件夹
const copyFolder = (source: string, destination: string) => {
  if (shell.test('-e', source)) {
    createDirectoryIfNotExists(destination) // 确保目标目录存在
    shell.cp('-R', `${source}/.`, destination) // 复制整个文件夹
  }
}

// 复制文件夹中的文件
const copyFolderFiles = (source: string, destination: string) => {
  if (shell.test('-d', source)) {
    createDirectoryIfNotExists(destination) // 确保目标目录存在
    shell.cp('-R', `${source}/*`, destination) // 仅复制文件夹中的文件
  }
}

// 删除 dist/tsc 目录内容
deleteFolderContents('dist/tsc')

// 删除 dist/code 目录内容
deleteFolderContents('dist/code')

// 检测并创建 dist/code 目录
createDirectoryIfNotExists('dist/code')

// 检测并创建 dist/tsc 目录
createDirectoryIfNotExists('dist/tsc')

// 检测并创建 dist/file 目录
createDirectoryIfNotExists('dist/file')

// 编译 TypeScript 文件
shell.exec('tsc')

// 复制 public 文件夹到 dist/tsc 目录（包括文件夹本身）
copyFolder('public', 'dist/tsc/public')

// 复制 default_file 文件夹到 dist/tsc 目录（包括文件夹本身）
copyFolder('default_file', 'dist/tsc/default_file')

// 复制 src/public 文件夹到 dist/tsc 目录（包括文件夹本身）
copyFolder('src/public', 'dist/tsc/public')

// 复制 tsc 文件夹中的文件到 dist/code 目录
copyFolderFiles('dist/tsc', 'dist/code')

// 复制 file 文件夹中的文件到 dist/code 目录
copyFolderFiles('dist/file', 'dist/code')

// 复制 package.json 和 yarn.lock 文件到 dist/code 目录
shell.cp('package.json', 'dist/code/package.json')
shell.cp('yarn.lock', 'dist/code/yarn.lock')

console.log('成功构建')
