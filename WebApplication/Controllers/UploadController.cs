using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication.Controllers
{
    /// <summary>
    /// 基于WebUploader插件的图片上传实例
    /// </summary>
    public class UploadController : Controller
    {
        // GET: Upload
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 直接上传
        /// </summary>
        /// <returns></returns>
        public ActionResult Upload()
        {
            return View();
        }

        /// <summary>
        /// 简单上传
        /// </summary>
        /// <returns></returns>
        public ActionResult SimpleUpload()
        {
            return View();
        }

        /// <summary>
        /// 模态框上传
        /// </summary>
        /// <returns></returns>
        public ActionResult ModalUpload()
        {
            return View();
        }

        /// <summary>
        /// 上传文件方法
        /// </summary>
        /// <param name="form">表单参数</param>
        /// <param name="file">文件</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult UploadImg(FormCollection form, HttpPostedFileBase file)
        {
            try
            {
                string filePathName = string.Empty;
                string localPath = string.Empty;
                string imagePath = string.Empty;


                imagePath = "/Upload/Images/User/";
                localPath = Path.Combine(HttpRuntime.AppDomainAppPath, "Upload/Images/");

                if (Request.Files.Count == 0)
                {
                    throw new Exception("请选择上传文件！");
                    //return Json(new JsonResultModel(-1,"请选择上传文件",null));
                }

                string ex = Path.GetExtension(file.FileName);

                filePathName = Guid.NewGuid().ToString("N") + ex;
                if (!System.IO.Directory.Exists(localPath))
                {
                    System.IO.Directory.CreateDirectory(localPath);
                }
                file.SaveAs(Path.Combine(localPath, filePathName));

                // string imgAddress = Request.Url.GetLeftPart(UriPartial.Authority) + imagePath + filePathName;
                string imgAddress = imagePath + filePathName;
                return Json(new {
                    Status = 200,
                    Message = "上传图片成功！",
                    Data = imgAddress
                });
            }
            catch (Exception)
            {
                //扔出异常
                throw;
            }

        }

    }
}