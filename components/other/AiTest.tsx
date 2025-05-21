"use client"
import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from 'react';
import './AiTest.css'
interface ImageEntry {
    id: string; // Để theo dõi duy nhất, hữu ích cho key trong React
    file: File;
    preview: string;
    content: string;
}
type Story = {
    url: string,
    content: string,
}

const MAX_IMAGES = 10;

export default function AiTestForm() {
    const [imageEntries, setImageEntries] = useState<ImageEntry[]>([]);
    const [summary, setSummary] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<Story | null>(null);
    const [result, setResult] = useState<Story[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [typePrompt, setTypePrompt] = useState('0');
    const [isLoadingVideo, setIsLoadingVideo] = useState<boolean>(false)
    const url = 'http://localhost:8000'
    // const url = 'http://localhost:8000'
    // http://localhost:8000
    // Dọn dẹp URL đối tượng khi thành phần bị unmount hoặc imageEntries thay đổi
    useEffect(() => {
        return () => {
            imageEntries.forEach(entry => URL.revokeObjectURL(entry.preview));
        };
    }, [imageEntries]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setSuccessMessage(null);

        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            const newImageEntries: ImageEntry[] = [];

            if (imageEntries.length + filesArray.length > MAX_IMAGES) {
                setError(`Bạn chỉ có thể tải lên tối đa ${MAX_IMAGES} ảnh.`);
                if (fileInputRef.current) {
                    fileInputRef.current.value = ""; // Xóa lựa chọn để người dùng có thể chọn lại
                }
                return;
            }

            filesArray.forEach(file => {
                if (imageEntries.length + newImageEntries.length < MAX_IMAGES) {
                    newImageEntries.push({
                        id: crypto.randomUUID(), // Tạo ID duy nhất
                        file: file,
                        preview: URL.createObjectURL(file),
                        content: '',
                    });
                }
            });
            setImageEntries(prevEntries => [...prevEntries, ...newImageEntries]);

            if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Xóa để cho phép chọn lại cùng file nếu đã xóa trước đó
            }
        }
    };

    const handleContentChange = (id: string, newContent: string) => {
        setImageEntries(prevEntries =>
            prevEntries.map(entry =>
                entry.id === id ? { ...entry, content: newContent } : entry
            )
        );
    };

    const handleResultChange = (ind: number, newContent: string) => {
        setResult(prevResult =>
            prevResult.map((item, index) =>
                index === ind ? { ...item, content: newContent } : item
            )
        );
    }

    const handleRemoveImage = (id: string) => {
        setError(null);
        const entryToRemove = imageEntries.find(entry => entry.id === id);
        if (entryToRemove) {
            URL.revokeObjectURL(entryToRemove.preview); // Dọn dẹp URL đối tượng
        }
        setImageEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);
        if (!summary.trim()) {
            setError("Vui lòng nhập nội dung tóm tắt chung.");
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        imageEntries.forEach(entry => {
            formData.append('images', entry.file);
            // Nếu không có nội dung, gửi chuỗi rỗng theo yêu cầu cURL
            formData.append('contents', entry.content || '');
        });
        formData.append('summary', summary);
        formData.append('typePrompt', typePrompt)
        // Để gỡ lỗi: xem các mục FormData
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
        }
        console.log(formData)
        // Log FormData để kiểm tra
        try {
            const response = await fetch(url + '/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch (e) {
                    errorData = { message: `Lỗi HTTP! Trạng thái: ${response.status}` };
                }
                throw new Error(errorData.message || `Lỗi HTTP! Trạng thái: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
            setSuccessMessage(result.response);
            if (result.response && Array.isArray(result.response)) {
                console.log(imageEntries)
                const newStory: Story[] = result.response.map((res: any, index: number) => {
                    let urlImg = "";
                    if (res.image) {
                        urlImg = url + res.image
                    }
                    else {
                        urlImg = imageEntries[index] ? URL.createObjectURL(imageEntries[index].file) : "";
                    }
                    const rs: Story = {
                        url: urlImg,
                        content: res.content
                    }
                    return rs;
                })
                console.log(newStory);
                setResult(newStory);
            }

            // Dọn dẹp URL đối tượng của các ảnh đã tải lên thành công
            // imageEntries.forEach(entry => URL.revokeObjectURL(entry.preview));

            setImageEntries([]);
            setSummary('');

        } catch (err: any) {
            setError(err.message || 'Không thể tải lên. Vui lòng thử lại.');
            console.error('Lỗi tải lên:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-gray-100 font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
                            Trình Tạo Nội Dung Bằng Ảnh
                        </span>
                    </h1>
                    <p className="mt-4 text-lg text-slate-400">
                        Tải lên ảnh của bạn kèm mô tả và một bản tóm tắt chung (tối đa {MAX_IMAGES} ảnh).
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-10 p-8 sm:p-10 bg-slate-800 shadow-2xl rounded-xl border border-slate-700">
                    {/* Phần chọn File */}
                    <div>
                        <label htmlFor="file-upload" className="block text-sm font-semibold text-sky-300 mb-2">
                            Chọn Ảnh ({imageEntries.length}/{MAX_IMAGES}) <span className='text-gray-500 text-xs ml-1'>(Không có AI sẽ tự tạo)</span>
                        </label>
                        <div className={`mt-1 flex justify-center items-center px-6 pt-8 pb-8 border-2 ${error ? 'border-red-500' : 'border-slate-600'} border-dashed rounded-md hover:border-sky-500 transition-colors duration-300 ease-in-out`}>
                            <div className="space-y-2 text-center">
                                <svg
                                    className="mx-auto h-16 w-16 text-slate-500"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="flex text-sm text-slate-400 items-center justify-center">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer bg-slate-700 rounded-md font-medium text-sky-400 hover:text-sky-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-slate-800 focus-within:ring-sky-500 px-4 py-2 transition-all duration-200 ease-in-out"
                                    >
                                        <span>Tải tệp lên</span>
                                        <input
                                            id="file-upload"
                                            name="images"
                                            type="file"
                                            ref={fileInputRef}
                                            className="sr-only"
                                            multiple
                                            accept="image/png, image/jpeg, image/jpg"
                                            onChange={handleFileChange}
                                            disabled={imageEntries.length >= MAX_IMAGES || isLoading}
                                        />
                                    </label>
                                    <p className="pl-2">hoặc kéo và thả</p>
                                </div>
                                <p className="text-xs text-slate-500">PNG, JPG, JPEG (tối đa 10MB mỗi tệp)</p>
                            </div>
                        </div>
                    </div>

                    {/* Xem trước ảnh và trường nội dung */}
                    {imageEntries.length > 0 && (
                        <div className="space-y-8 animate-fade-in">
                            <h2 className="text-2xl font-semibold text-sky-300 border-b border-slate-700 pb-3 transition-all duration-500 animate-slide-down">Chi tiết Ảnh</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {imageEntries.map((entry, index) => (
                                    <div
                                        key={entry.id}
                                        className="p-5 bg-slate-700/60 rounded-lg border border-slate-600 shadow-lg relative group transition-all duration-300 hover:shadow-sky-500/30 animate-fade-in-up"
                                        style={{ animationDelay: `${index * 80}ms` }}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(entry.id)}
                                            className="absolute -top-3 -right-3 z-10 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-700 transition-transform duration-200 ease-in-out transform group-hover:scale-110 animate-pop"
                                            disabled={isLoading}
                                            aria-label={`Xóa ảnh ${index + 1}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        <div className="flex flex-col space-y-4">
                                            <img
                                                src={entry.preview}
                                                alt={`Xem trước ${index + 1}`}
                                                className="h-48 w-full rounded-md object-cover border border-slate-500 transition-transform duration-500 group-hover:scale-105 animate-fade-in"
                                            />
                                            <div>
                                                <label htmlFor={`content-${entry.id}`} className="block text-sm font-medium text-sky-400 mb-1 transition-colors duration-300">
                                                    Ảnh {index + 1}
                                                </label>
                                                <textarea
                                                    id={`content-${entry.id}`}
                                                    rows={3}
                                                    className="shadow-sm appearance-none w-full p-3 border border-slate-600 rounded-md placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-slate-700 text-gray-100 caret-sky-400 transition-all duration-300 animate-fade-in"
                                                    placeholder="Mô tả về ảnh này..."
                                                    value={entry.content}
                                                    onChange={(e) => handleContentChange(entry.id, e.target.value)}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="relative inline-block w-full md:w-64 animate-fade-in">
                        <select
                            className="block appearance-none w-full bg-gray-700 border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline text-gray-200 transition-all duration-300 focus:ring-2 focus:ring-sky-500"
                            name=""
                            id=""
                            value={typePrompt}
                            onChange={(e) => setTypePrompt(e.target.value)}
                        >
                            <option value="0">Kể chuyện</option>
                            <option value="1">Review</option>
                            <option value="2">Giả định</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-200">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                    {/* Trường tóm tắt */}
                    <div>
                        <label htmlFor="summary" className="block text-sm font-semibold text-sky-300 mb-1">
                            Tóm tắt chung
                        </label>
                        <textarea
                            id="summary"
                            name="summary"
                            rows={5}
                            className="shadow-sm appearance-none block w-full p-3 border border-slate-600 rounded-md placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-slate-700 text-gray-100 caret-sky-400 transition-all duration-300 animate-fade-in"
                            placeholder="Cung cấp bản tóm tắt chung cho tất cả các ảnh..."
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>

                    {/* Thông báo lỗi và thành công */}
                    {error && (
                        <div className="p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-md shadow-md animate-slide-in-down">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L10 8.586 7.707 6.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 001.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-300">Đã xảy ra lỗi</h3>
                                    <div className="mt-2 text-sm text-red-400">
                                        <p>{error}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Nút gửi */}
                    <div className="pt-5">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-lg shadow-lg text-base font-medium text-white bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 animate-pop"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang tải lên...
                                </>
                            ) : 'Gửi Dữ Liệu'}
                        </button>
                    </div>
                    {successMessage && (
                        <div className="p-4 bg-green-900/50 border border-green-700 text-green-300 rounded-md shadow-md animate-slide-in-up">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L10 8.586 7.707 6.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 001.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-green-300">Thành công!</h3>
                                    <div className="mt-2 text-sm text-green-400">
                                        <p>{successMessage.content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {successMessage && (
                        <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-gray-950 text-white rounded-xl shadow-2xl transition-all duration-300 ease-in-out animate-fade-in-up">
                            <div className="space-y-10">
                                {result.map((story, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col bg-gray-900 rounded-lg shadow-xl hover:shadow-2xl transition duration-200 ease-in-out cursor-pointer overflow-hidden animate-fade-in-up"
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        <img
                                            src={story.url}
                                            alt={`Ảnh ${idx + 1}`}
                                            className="w-full h-auto object-contain rounded-t-lg mb-5 transition-transform duration-500 hover:scale-105 animate-fade-in"
                                        />

                                        <div className="p-5 pt-0">
                                            <p className="text-xl sm:text-2xl font-bold text-pink-400 mb-3 animate-slide-down">
                                                Story #{idx + 1}
                                            </p>
                                            <textarea
                                                rows={3}
                                                className="shadow-sm text-lg appearance-none w-full p-3 border border-slate-600 rounded-md placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-gray-700 text-gray-100 caret-sky-400 transition-colors animate-fade-in"
                                                placeholder="Sửa lại edit"
                                                value={story.content}
                                                onChange={(e) => handleResultChange(idx, e.target.value)}
                                                disabled={isLoadingVideo}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {result.length > 0 &&
                        <div className="pt-5 animate-fade-in">
                            <button
                                type="button"
                                disabled={isLoadingVideo}
                                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-lg shadow-lg text-base font-medium text-white bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 animate-pop"
                            >
                                {isLoadingVideo ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang tạo video lên...
                                    </>
                                ) : 'Tạo video'}
                            </button>
                        </div>
                    }

                </form>

                <footer className="mt-16 text-center text-sm text-slate-500 animate-fade-in">
                    <p>&copy; {new Date().getFullYear()} Công ty AI của bạn. Bảo lưu mọi quyền.</p>
                </footer>
            </div >
        </div >
    );
}
