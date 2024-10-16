<template>
	<div class="page_content">
		<h2 class="page_title">表单</h2>
		<el-form :model="form" ref="formRef" label-width="150px">
			<el-form-item
				label="姓名:"
				prop="username"
				:rules="[
					{ required: true, message: '请输入姓名', trigger: 'blur' },
				]"
			>
				<el-input v-model="form.username" />
			</el-form-item>
			<el-form-item
				label="性别:"
				prop="sex"
				:rules="[
					{
						required: true,
						message: '请选择性别',
						trigger: 'change',
					},
				]"
			>
				<el-radio-group v-model="form.sex">
					<el-radio label="1">男</el-radio>
					<el-radio label="2">女</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="年龄:">
				<el-input v-model="form.age" />
			</el-form-item>
			<el-form-item label="文化程度:">
				<el-select v-model="form.region" placeholder="请选择">
					<el-option label="Zone one" value="shanghai" />
					<el-option label="Zone two" value="beijing" />
				</el-select>
			</el-form-item>
			<el-form-item prop="" label="日期:">
				<el-date-picker
					v-model="form.time"
					type="date"
					label="Pick a date"
					placeholder="Pick a date"
					style="width: 100%"
				/>
			</el-form-item>
			<el-form-item label="运动:" prop="type">
				<el-checkbox-group v-model="form.type">
					<el-checkbox label="打球" name="type" />
					<el-checkbox label="跑步" name="type" />
					<el-checkbox label="跳绳" name="type" />
					<el-checkbox label="打太极" name="type" />
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="头像:" prop="type">
				<el-upload
					class="avatar-uploader"
					action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
					:show-file-list="false"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload"
				>
					<img v-if="imageUrl" :src="imageUrl" class="avatar" />
					<el-icon v-else class="avatar-uploader-icon"
						><Plus
					/></el-icon>
				</el-upload>
			</el-form-item>
			<el-form-item label="其他:">
				<el-input v-model="form.age" type="textarea" :rows="4" />
			</el-form-item>
			<el-form-item label="是否同意:">
				<el-switch v-model="form.age" />
			</el-form-item>

			<el-button type="primary" size="large" @click="Submit"
				>提交</el-button
			>
		</el-form>
	</div>
</template>
<script setup>
import { reactive, ref } from "vue"
import { useRoute } from "vue-router"

import { ElMessage } from "element-plus"
import { Plus } from "@element-plus/icons-vue"
const route = useRoute()
console.log(route)
const formRef = ref(null)
const form = reactive({
	username: "",
	sex: "",
	age: "",
	time: "",
})
const imageUrl = ref("")

const handleAvatarSuccess = (response, uploadFile) => {
	imageUrl.value = URL.createObjectURL(uploadFile.raw)
}

const beforeAvatarUpload = (rawFile) => {
	if (rawFile.type !== "image/jpeg") {
		ElMessage.error("Avatar picture must be JPG format!")
		return false
	} else if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error("Avatar picture size can not exceed 2MB!")
		return false
	}
	return true
}
function Submit() {
	formRef.value.validate((volid) => {
		if (volid) {
			ElMessage.success("保存成功")
		} else {
			ElMessage.warning("请填写必填项")
		}
	})
}
</script>
<style lang="less" scope>
.el-form {
	.el-input,
	.el-date-editor {
		width: 240px !important;
	}
	.el-form-item {
		margin-bottom: 30px;
	}
}
.avatar-uploader .el-upload {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 120px;
	height: 120px;
	text-align: center;
}
.avatar-uploader .avatar {
	width: 120px;
	height: 120px;
	display: block;
}
</style>
