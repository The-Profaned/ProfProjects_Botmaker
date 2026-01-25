declare namespace Packages.okhttp3 {
	class OkHttpClient {
		constructor();
		static Builder: typeof OkHttpClientBuilder;
		newCall(request: Request): Call;
	}

	class OkHttpClientBuilder {
		constructor();
		connectTimeout(timeout: number, unit: java.util.concurrent.TimeUnit): OkHttpClientBuilder;
		readTimeout(timeout: number, unit: java.util.concurrent.TimeUnit): OkHttpClientBuilder;
		writeTimeout(timeout: number, unit: java.util.concurrent.TimeUnit): OkHttpClientBuilder;
		build(): OkHttpClient;
	}

	class Request {
		static Builder: typeof RequestBuilder;
	}

	class RequestBuilder {
		constructor();
		url(url: string): RequestBuilder;
		addHeader(name: string, value: string): RequestBuilder;
		get(): RequestBuilder;
		post(body: RequestBody): RequestBuilder;
		put(body: RequestBody): RequestBuilder;
		patch(body: RequestBody): RequestBuilder;
		delete(): RequestBuilder;
		method(method: string, body: RequestBody): RequestBuilder;
		build(): Request;
	}

	class RequestBody {
		static create(mediaType: MediaType, content: string): RequestBody;
	}

	class MediaType {
		static parse(mediaType: string): MediaType;
	}

	class Call {
		execute(): Response;
	}

	class Response {
		code(): number;
		body(): ResponseBody | null;
		headers(): Headers;
		close(): void;
	}

	class ResponseBody {
		string(): string;
	}

	class Headers {
		names(): java.util.Set<string>;
		get(name: string): string;
	}
}
