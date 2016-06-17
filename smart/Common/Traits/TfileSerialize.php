<?php

namespace Smart\Common\Traits;

trait TfileSerialize {
    protected static $resizableSize;
    protected static $resizableQuality;
    protected static $mapping = array();
    protected static $results = array(
        'text'=>'Transação completada com sucesso!',
        'rows'=>array(),
        'crud'=>'upload',
        'errors'=>array(),
        'success'=>true,
        'message'=>false,
        'records'=>0 );


    public function filePath( ){
        return sprintf(
            "%s://%s%s",
            isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
            $_SERVER['SERVER_NAME'],
            $_SERVER['REQUEST_URI']
        );
    }

    public function saveFile($model) {
        $results = (object) self::$results;
        $post = (object) $model->getSubmit()->getToArray();
        $tablename = $model->getNotate()->instance->Entity->name;

        self::setMapping();

        // recupera variáveis
        $fileData = $_FILES["filedata"];
        $fileName = $fileData["name"];
        $fileType = $fileData["type"];
        $tempName = $fileData["tmp_name"];
        $dataType = self::$mapping[$fileType];

        if(!is_uploaded_file($tempName)) {
            $results->success = false;
            $results->text = "O arquivo não foi enviado com sucesso. Erro de sistema: {$fileData['error']}.";
            return json_encode($results);
        }

        if(!array_key_exists($fileType, self::$mapping)) {
            $results->success = false;
            $results->text = "Tipo de arquivo não mapeado para esta operação!";
            return json_encode($results);
        }

        // recupera extensão do arquivo
        $fileExtension = strtoupper(strrchr($fileName,"."));
        $fileExtension = str_replace(".","",$fileExtension);

        $fileInfo = array("fileType"=>$fileType,"fileExtension"=>$fileExtension,"dataType"=>$dataType, "fileName"=>$fileName);
        $fileInfo = stripslashes(json_encode($fileInfo));

        // comprime arquivo temporário
//        if($dataType === true) {
//            self::sizeFile();
//            self::workSize($tempName);
//        }

        //http://php.net/manual/en/pdostatement.bindparam.php
        //http://stackoverflow.com/questions/31717746/insert-image-into-sql-server-db-with-pdo
        $tempData = file_get_contents($tempName);
        $sql = "update {$tablename} set filedata = :filedata, fileinfo = :fileinfo where id = :id";
        $pdo = $this->prepare($sql);
        $pdo->bindParam(':id', $post->id, \PDO::PARAM_INT);
        $pdo->bindParam(':fileinfo', $fileInfo, \PDO::PARAM_STR);
        $pdo->bindParam(':filedata', $tempData, \PDO::PARAM_LOB, 0, \PDO::SQLSRV_ENCODING_BINARY);
        $success = $pdo->execute();

//        $tempData = base64_encode(file_get_contents($tempName));
//        $affected = $this->exec("update $tablename set filedata = '$tempData', fileinfo = '$fileInfo' where id = $post->id");

        $uploaded = array(
            'fileinfo'=>$fileInfo,
            'filedata'=>base64_encode($tempData)
        );

        $results->rows = $uploaded;
        $results->records = 1;
        $results->success = $success;

//        $results->rows = $uploaded;
//        $results->records = $affected;
//        $results->success = ($affected != 0);

        unlink($tempName);

        return $results;
    }

    public function nullFile($model) {
        $post = (object) $model->getSubmit()->getToArray();
        $tablename = $model->getNotate()->instance->Entity->name;

        $sql = "update $tablename set filedata = null, fileinfo = null where id = $post->id";

        $affected = $this->exec($sql);

        return $affected;
    }

    public function loadFile() {
        $result = $this->loadData();

        $info = json_decode($result["fileinfo"]);
        $data = base64_decode($result["filedata"]);

        $type = $info->fileType;

        ob_clean();
        header("Content-Type: $type");

        print($data);
    }

    public function downFile() {
        $result = $this->loadData();

        $info = json_decode($result["fileinfo"]);
        $data = base64_decode($result["filedata"]);

        $type = $info->fileType;
        $name = $info->fileName;

        ob_clean();
        header("Content-Type: $type;");
        header("Content-Length: " . strlen($data));
        header("Content-Disposition: attachment; filename=\"$name\"");

        print($data);
    }

    protected function loadData() {
        $post = (object) $_REQUEST;

		$id = $post->id;
		$tablename = $post->tablename;
		
         $sql = "select filedata, fileinfo from {$tablename} where id = {$id}";

        $rows = $this->query($sql)->fetchAll();

        return $rows[0];
    }

    protected static function setMapping() {
        self::$mapping["image/gif"] = true;
        self::$mapping["image/png"] = true;
        self::$mapping["image/jpeg"] = true;
        self::$mapping["image/pjpeg"] = true;
        self::$mapping["text/plain"] = false;
        self::$mapping["application/pdf"] = false;
        self::$mapping["application/zip"] = false;
        self::$mapping["application/msword"] = false;
        self::$mapping["application/x-excel"] = false;
        self::$mapping["application/x-msexcel"] = false;
        self::$mapping["application/octet-stream"] = false;
        self::$mapping["application/vnd.ms-excel"] = false;
        self::$mapping["text/comma-separated-values"] = false;
        self::$mapping["application/vnd.ms-powerpoint"] = false;
        self::$mapping["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"] = false;
        self::$mapping["application/vnd.openxmlformats-officedocument.wordprocessingml.document"] = false;
    }

    protected static function fileLogo($type) {
        return "";
    }

    protected static function sizeFile($size = 640, $quality = 80) {
        if($size < 10) $size = 10;
        if($quality > 100) $quality = 100;
        if($quality < 030) $quality = 030;

        self::$resizableSize = $size;
        self::$resizableQuality = $quality;
    }

    /**
     * Resize image class will allow you to resize an image
     *
     * Can resize to exact size
     * Max width size while keep aspect ratio
     * Max height size while keep aspect ratio
     * Automatic while keep aspect ratio
     *
     * site: http://www.paulund.co.uk/resize-image-class-php
     */
    protected static function workSize($imgData) {
        $ext = getimagesize($imgData)['mime'];

        switch($ext) {
            case 'image/jpg':
            case 'image/jpeg':
                $tmpData = @imagecreatefromjpeg($imgData);
                break;
            case 'image/gif':
                $tmpData = @imagecreatefromgif($imgData);
                break;
            case 'image/png':
                $tmpData = @imagecreatefrompng($imgData);
                break;
            default:
                throw new \Exception("Este arquivo não é uma imagem válida!", 1);
        }

        $x = imagesx($tmpData);
        $y = imagesy($tmpData);

        $max = ($x > $y) ? $x : $y;

        $rate = $max/self::$resizableSize;
        $finalX = $x/$rate;
        $finalY = $y/$rate;

        if($finalX > $x) {
            $finalX = $x;
            $finalY = $y;
        }

        $finalX = ceil($finalX);
        $finalY = ceil($finalY);

        $newData = imagecreatetruecolor($finalX,$finalY);

        switch($ext) {
            case 'image/png':
            case 'image/gif':
                self::setTransparency($newData,$tmpData);
                break;
            case 'image/jpg':
            case 'image/jpeg':
                imagefill($newData,0,0,imagecolorallocate($newData, 255, 255, 255));
                break;
        }

        imagecopyresampled($newData, $tmpData, 0, 0, 0, 0,$finalX, $finalY, $x, $y);

        switch($ext) {
            case 'image/png':
                imagepng($newData, $imgData);
                break;
            case 'image/jpg':
            case 'image/jpeg':
                imagejpeg($newData, $imgData, self::$resizableQuality);
                break;
            case 'image/gif':
                imagegif($newData, $imgData);
                break;
        }

        imagedestroy($tmpData);
        imagedestroy($newData);
    }

    protected static function setTransparency($newimage,$oldimage) {
        $transparencyIndex = imagecolortransparent($oldimage);
        $transparencyColor = array('red' => 255, 'green' => 255, 'blue' => 255);

        if ( $transparencyIndex >= 0 ) {
             $transparencyColor  = imagecolorsforindex($oldimage, $transparencyIndex);
        }

        $transparencyIndex      = imagecolorallocate($newimage, $transparencyColor['red'], $transparencyColor['green'], $transparencyColor['blue']);
        imagefill($newimage, 0, 0, $transparencyIndex);
        imagecolortransparent($newimage, $transparencyIndex);
    }

}