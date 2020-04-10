<template>
  <div class="createActivity">
    <b-container class="editContainer px-5">
      <h4 class="text-center text-secondary">本平台免费收录户外运动类线路，全网进行发布和展示</h4>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="线路信息："
          :label-class="labelClass"
          label-for="input-1"
          description="最多30个字，必须是时间+地点+俱乐部名称+活动玩法亮点。"
        >
          <b-form-input
            id="input-1"
            v-model="form.routeInfo"
            type="text"
            required
            maxlength="30"
            placeholder="输入线路信息"
          ></b-form-input>
        </b-form-group>
        <b-row>
          <b-col>
            <b-form-group
              id="input-group-2"
              label="集合城市："
              :label-class="labelClass"
              label-for="input-2"
            >
              <b-row>
                <b-col>
                  <b-form-select
                    id="input-2"
                    v-model="form.province"
                    required
                    :options="provinces"
                    inline
                    @change="clearCityInfo"
                  ></b-form-select>
                </b-col>
                <b-col>
                  <b-form-select
                    cols="6"
                    id="input-2-1"
                    v-model="form.city"
                    required
                    :options="citys"
                    inline
                  ></b-form-select>
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              id="input-group-3"
              label="活动地点："
              :label-class="labelClass"
              label-for="input-3"
            >
              <b-form-input id="input-3" v-model="form.location" required placeholder="多个城市请用逗号隔开"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              id="input-group-4"
              label="时长："
              :label-class="labelClass"
              label-for="input-4"
            >
              <b-form-select id="input-4" v-model="form.day" required :options="days"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              id="input-group-5"
              label="类型："
              :label-class="labelClass"
              label-for="input-5"
            >
              <b-form-select id="input-5" v-model="form.category" required :options="categories"></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-form-group
          id="input-group-6"
          label="封面图片："
          :label-class="labelClass"
          label-cols="3"
          label-for="input-6"
        >
          <label for="input-6">
            <b-row>
              <b-col>
                <b-img
                  v-if="form.picture"
                  thumbnail
                  fluid
                  :src="form.picture"
                  alt="Image 1"
                  ref="input-6"
                  style="height:150px"
                ></b-img>
                <b-img
                  v-else
                  thumbnail
                  fluid
                  :src="require('@/assets/img/images.jpeg')"
                  alt="Image 1"
                  ref="input-6"
                  style="height:150px"
                ></b-img>
              </b-col>
            </b-row>
          </label>
          <b-form-file
            id="input-6"
            v-show="false"
            v-model="file"
            :state="Boolean(file)"
            placeholder="点击上传封面图"
            @change="uploadToOSS"
          ></b-form-file>
        </b-form-group>
        <b-form-group
          id="input-group-7"
          label="详细介绍："
          :label-class="labelClass"
          label-for="editor1"
        >
          <quill-editor ref="myQuillEditor" v-model="form.destinationInfo" :options="editorOption" />
        </b-form-group>
        <b-form-group id="input-group-10" label label-for="editor5">
          <b-checkbox inline v-model="form.agree" class="pt-1">我已阅读并同意了《商家入驻须知》和《用户预订须知》</b-checkbox>
        </b-form-group>
        <b-button type="reset" variant="outline-danger">Reset</b-button>
        <b-button type="submit" class="ml-4" variant="outline-secondary">Submit</b-button>
      </b-form>
      <b-card class="mt-3" header="Form Data Result" v-show="showData">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </b-container>
    <input type="file" id="getFile" @change="handleFileChange" style="visibility: hidden;" />
  </div>
</template>
<script>
import { uploadOSS, addClubTrip } from "@/api";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "./imagePaste.js";
import ImageResize from "quill-image-resize-module";
window.Quill.register("modules/imageResize", ImageResize);

const uuid4 = require("uuid/v4");
export default {
  name: "createActivity",
  components: { quillEditor },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    provinces: function() {
      let districtList = this.$store.state.districts;
      let result = [{ text: "请选择省份", value: null }];
      if (districtList) {
        result = result.concat(
          districtList.map(function(district) {
            return { text: district.name, value: district.id };
          })
        );
      }
      return result;
    },
    citys: function() {
      let result = [{ text: "请选择城市", value: null }];
      let districtList = this.$store.state.districts;
      if (this.form.province && districtList) {
        let targetProvince = districtList.find(
          item => item.id == this.form.province
        );
        if (targetProvince.childrenList) {
          result = result.concat(
            targetProvince.childrenList.map(function(district) {
              return { text: district.name, value: district.id };
            })
          );
        }
      }
      return result;
    }
  },
  data() {
    return {
      labelClass: "font-weight-bold text-dark",
      file: null,
      imgProp: { height: 100 },
      showData: false,
      editorOption: {
        placeholder: "请输入...",
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],

              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction

              [{ size: ["small", false, "large", "huge"] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],

              ["clean"], // remove formatting button
              ["image"]
            ],
            handlers: {
              image: this.imgHandler
            }
          },
          imagePaste: {
            addImageBlob: async (blob, callback) => {
              let imageUrl = await this.uploadImage(blob);
              // your upload function, get the uploaded image url, add then
              callback(imageUrl);
            }
          },
          imageResize: true
        }
      },
      form: {
        routeInfo: null,
        location: null,
        province: null,
        city: null,
        day: null,
        category: null,
        picture: null,
        destinationInfo: null,
        agree: false
      },
      days: [
        { text: "选择时长", value: null },
        { text: "1天", value: 1 },
        { text: "2天", value: 2 },
        { text: "3天", value: 3 },
        { text: "4天", value: 4 }
      ],
      categories: [
        { text: "选择类型", value: null },
        { text: "滑雪", value: 1 },
        { text: "冲浪", value: 2 },
        { text: "攀岩", value: 3 },
        { text: "蹦极", value: 4 }
      ],
      show: true
    };
  },
  methods: {
    async uploadToOSS(e) {
      try{
        let file = e.target.files[0];
        let result = await uploadOSS("activity/" + uuid4(), file);
        this.form.picture = result;
      }catch(err){
        if (err !== 'cancel' && err !== 'close') {
          console.error('business error', err)
          this.$swal('出错了！' + err.message);
        }
      }
    },
    async onSubmit(evt) {
      evt.preventDefault();
      if (this.form.agree) {
        await addClubTrip(this.form);
        this.$swal("添加成功");
      } else {
        this.$swal("请先阅读并同意《商家入驻须知》和《用户预订须知》");
      }
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.routeInfo = null;
      this.form.location = null;
      this.form.province = null;
      this.form.day = null;
      this.form.category = null;
      this.form.picture = null;
      this.form.destinationInfo = null;
      this.form.scheduleInfo = null;
      this.form.referenceData = null;
      this.form.necessaryInfo = null;
      this.form.costInfo = null;
      this.form.agree = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    clearCityInfo() {
      this.form.city = null;
    },
    imgHandler(state) {
      this.addRange = this.editor.getSelection();
      if (state) {
        let fileInput = document.getElementById("getFile");
        fileInput.click(); // 加一个触发事件
      }
      this.uploadType = "image";
    },
    async handleFileChange(e) {
      let folkImg = e.target.files[0];
      let url = await this.uploadImage(folkImg);
      this.upScuccess(url);
    },
    upScuccess(url) {
      if (url != null && url.length > 0) {
        let value = url;
        console.log(url);
        this.addRange = this.editor.getSelection();
        this.editor.insertEmbed(
          this.addRange !== null ? this.addRange.index : 0,
          this.uploadType,
          value
        );
      } else {
        this.$swal(`${this.uploadType}插入失败`);
      }
    },
    async uploadImage(img) {
      let result = await uploadOSS("activity/" + uuid4(), img);
      this.$swal("上传成功！");
      return result;
    }
  }
};
</script>
<style lang="scss" scoped>
.editContainer {
  padding: 120px 0;
}
</style>
