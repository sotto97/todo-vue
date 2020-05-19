// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'tofos-vuejs-demo'
var todoStorage = {
	fetch: function () {
		var todos = JSON.parse (
			localStorage.getItem(STORAGE_KEY) || '[]'
		)
		todos.forEach(function(todo, index) {
			todo.id = index
		})
		todoStorage.uid = todos.length
		return todos
	},
	save: function(todos) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
	}
}


new Vue({
	el: '#app',
	data: {
		todos: []
		// 使用するデータ
		options: [
			{ value: -1, label: '全て' }
			{ value: 0, label: '作業中' }
			{ value: 1, label: '完了' }
		],
		// 選択している options のvalueを記憶するためのデータ
		// 初期値を-1
		current: -1
	}
	methods: {
		// todoの追加処理
		doAdd: function(event, value) {
			// refで名前をつけておうた要素を参照
			var comment = this.$refs.comment
			// 入力しなければ何もなし
			if (!comment.value.length) {
				return
			}
			// {新しいID, コメント, 作業状態}
			// というオブジェクトを現在のtodoリストへpush
			// 作業状態「state」はデフォルト「作業中=0」で作成
			this.todos.push({
				id: todoStorage.uid++,
				comment: comment.value,
				state: 0
			})
			// フォーム要素を空にする
			comment.value = ''
		},
		doChangeState: function(item) {
			item.state = item.state ? 0 : 1
		},
		// 削除の処理
		doRemove: function(item) {
			var index = this.todos.index0f(item)
			this.todos.splice(index, 1)
		}
	}
	watch: {
		// オプションを使う場合はオブジェクト形式にする
		todos: {
			// 引数はwatchしているプロパティの変更後の値
			handler: function(todos) {
				todoStorage.save(todos)
			},
			// deepオプションでネストしているデータも監視できる
			deep: true
		}
	}
	created() {
		this.todos = todoStorage.fetch()
	}
})