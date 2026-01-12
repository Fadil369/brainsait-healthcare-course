#!/usr/bin/env python3
import os
import re

def update_module_file(filepath, module_number):
    """Update a module HTML file with reset progress functionality."""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update the HTML section for "Mark Module Complete"
    html_pattern = r'(<!-- Mark Module Complete -->[\s\S]*?<div>\s*<button id="mark-complete-btn"[\s\S]*?</button>\s*</div>\s*</section>)'
    html_replacement = '''<!-- Mark Module Complete -->
            <section class="bs-card p-6 sm:p-8">
                <h2 class="text-2xl sm:text-3xl font-bold mb-5 bs-title" data-en="Module Completion" data-ar="إكمال الوحدة">Module Completion</h2>
                
                <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div class="flex-1">
                        <p class="bs-muted mb-3" data-en="Mark this module as complete to track your progress. Your completion status is saved locally in your browser." data-ar="حدد هذه الوحدة كمكتملة لتتبع تقدمك. يتم حفظ حالة الإكمال محليًا في متصفحك.">
                            Mark this module as complete to track your progress. Your completion status is saved locally in your browser.
                        </p>
                        <div class="flex items-center gap-3">
                            <div class="bs-badge">
                                <i class="fas fa-check-circle"></i>
                                <span data-en="Current progress:" data-ar="التقدم الحالي:">Current progress:</span>
                                <span id="module-progress-display">0</span>%
                            </div>
                            <div class="bs-badge" id="completion-status-badge">
                                <i class="fas fa-clock"></i>
                                <span data-en="Not started" data-ar="لم يبدأ">Not started</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-3">
                        <button id="mark-complete-btn" class="bs-btn bs-btn-primary px-6 py-3">
                            <i class="fas fa-check"></i>
                            <span data-en="Mark Module Complete" data-ar="تحديد الوحدة كمكتملة">Mark Module Complete</span>
                        </button>
                        <button id="reset-progress-btn" class="bs-btn px-6 py-3">
                            <i class="fas fa-redo"></i>
                            <span data-en="Reset Progress" data-ar="إعادة تعيين التقدم">Reset Progress</span>
                        </button>
                    </div>
                </div>
                <div class="mt-4 text-sm bs-muted" data-en="Note: Progress is stored in your browser's local storage. Clearing browser data will reset your progress." data-ar="ملاحظة: يتم تخزين التقدم في التخزين المحلي للمتصفح. مسح بيانات المتصفح سيعيد تعيين تقدمك.">
                    Note: Progress is stored in your browser's local storage. Clearing browser data will reset your progress.
                </div>
            </section>'''
    
    # Update the JavaScript section
    js_pattern = r'(// Module completion functionality[\s\S]*?window\.addEventListener\(\'courseLangChanged\', updateProgressDisplay\);\s*}\);\s*</script>)'
    js_replacement = f'''// Module completion functionality
        document.addEventListener('DOMContentLoaded', function() {{
            const moduleNumber = {module_number}; // Change this for each module
            const progressKey = `module${{moduleNumber}}Progress`;
            const display = document.getElementById('module-progress-display');
            const statusBadge = document.getElementById('completion-status-badge');
            const markCompleteBtn = document.getElementById('mark-complete-btn');
            const resetProgressBtn = document.getElementById('reset-progress-btn');
            
            function updateProgressDisplay() {{
                const progress = parseInt(localStorage.getItem(progressKey) || '0');
                if (display) display.textContent = progress;
                
                if (statusBadge) {{
                    if (progress >= 100) {{
                        statusBadge.innerHTML = '<i class="fas fa-check-circle"></i><span data-en="Completed" data-ar="مكتمل">Completed</span>';
                        statusBadge.classList.remove('bg-yellow-500/10', 'border-yellow-500/60');
                        statusBadge.classList.add('bg-green-500/10', 'border-green-500/60');
                    }} else if (progress >= 50) {{
                        statusBadge.innerHTML = '<i class="fas fa-spinner"></i><span data-en="In progress" data-ar="قيد التقدم">In progress</span>';
                        statusBadge.classList.remove('bg-green-500/10', 'border-green-500/60');
                        statusBadge.classList.add('bg-yellow-500/10', 'border-yellow-500/60');
                    }} else {{
                        statusBadge.innerHTML = '<i class="fas fa-clock"></i><span data-en="Not started" data-ar="لم يبدأ">Not started</span>';
                        statusBadge.classList.remove('bg-green-500/10', 'border-green-500/60', 'bg-yellow-500/10', 'border-yellow-500/60');
                    }}
                }}
                
                if (markCompleteBtn) {{
                    if (progress >= 100) {{
                        markCompleteBtn.innerHTML = '<i class="fas fa-check-double"></i><span data-en="Module Completed" data-ar="الوحدة مكتملة">Module Completed</span>';
                        markCompleteBtn.disabled = true;
                        markCompleteBtn.classList.remove('bs-btn-primary');
                        markCompleteBtn.classList.add('bg-green-600/30', 'border-green-500/40');
                    }} else {{
                        markCompleteBtn.innerHTML = '<i class="fas fa-check"></i><span data-en="Mark Module Complete" data-ar="تحديد الوحدة كمكتملة">Mark Module Complete</span>';
                        markCompleteBtn.disabled = false;
                        markCompleteBtn.classList.add('bs-btn-primary');
                        markCompleteBtn.classList.remove('bg-green-600/30', 'border-green-500/40');
                    }}
                }}
            }}
            
            if (markCompleteBtn) {{
                markCompleteBtn.addEventListener('click', function() {{
                    localStorage.setItem(progressKey, '100');
                    updateProgressDisplay();
                    
                    // Show confirmation
                    const originalText = markCompleteBtn.innerHTML;
                    markCompleteBtn.innerHTML = '<i class="fas fa-check-circle"></i><span data-en="Marked Complete!" data-ar="تم التحديد كمكتمل!">Marked Complete!</span>';
                    markCompleteBtn.classList.add('bg-green-600/30', 'border-green-500/40');
                    
                    setTimeout(() => {{
                        updateProgressDisplay();
                    }}, 1500);
                    
                    // Update parent page progress
                    if (window.parent && window.parent.updateProgressUI) {{
                        window.parent.updateProgressUI();
                    }}
                }});
            }}
            
            if (resetProgressBtn) {{
                resetProgressBtn.addEventListener('click', function() {{
                    // Confirm reset
                    const currentLang = window.getCourseLang ? window.getCourseLang() : 'en';
                    const confirmMessage = currentLang === 'ar' 
                        ? 'هل أنت متأكد أنك تريد إعادة تعيين التقدم لهذه الوحدة؟'
                        : 'Are you sure you want to reset progress for this module?';
                    
                    if (confirm(confirmMessage)) {{
                        localStorage.setItem(progressKey, '0');
                        updateProgressDisplay();
                        
                        // Show confirmation
                        const originalText = resetProgressBtn.innerHTML;
                        resetProgressBtn.innerHTML = '<i class="fas fa-check"></i><span data-en="Progress Reset!" data-ar="تم إعادة التعيين!">Progress Reset!</span>';
                        resetProgressBtn.classList.add('bg-blue-600/30', 'border-blue-500/40');
                        
                        setTimeout(() => {{
                            resetProgressBtn.innerHTML = '<i class="fas fa-redo"></i><span data-en="Reset Progress" data-ar="إعادة تعيين التقدم">Reset Progress</span>';
                            resetProgressBtn.classList.remove('bg-blue-600/30', 'border-blue-500/40');
                        }}, 1500);
                        
                        // Update parent page progress
                        if (window.parent && window.parent.updateProgressUI) {{
                            window.parent.updateProgressUI();
                        }}
                    }}
                }});
            }}
            
            // Initialize display
            updateProgressDisplay();
            
            // Update when language changes
            window.addEventListener('courseLangChanged', updateProgressDisplay);
        }});
    </script>'''
    
    # Apply replacements
    content = re.sub(html_pattern, html_replacement, content)
    content = re.sub(js_pattern, js_replacement, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated {filepath}")

def main():
    modules = [
        ('modules/module2.html', 2),
        ('modules/module4.html', 4),
        ('modules/module5.html', 5),
        ('modules/module6.html', 6)
    ]
    
    for filepath, module_number in modules:
        if os.path.exists(filepath):
            update_module_file(filepath, module_number)
        else:
            print(f"File not found: {filepath}")

if __name__ == '__main__':
    main()